/* eslint-disable camelcase */

import axios from 'axios';
import moment from 'moment';
import witAiCollection from './witai.model';
import BaseService from '../base/base.service';

const WIT_AI_BASE_URL = 'https://api.wit.ai';

class WitAIService extends BaseService {
  constructor() {
    super(witAiCollection);
  }

  /**
   * @params {
   *  Object of {
   *    text: String,
   *    intent_name: String,
   *    entities = [{
   *      entity: String,
   *      value: String,
   *      start: Number,
   *      end: Number
   *    }],
   *  }
   * } data
   */
  createSample = async ({
    text, intent_name, entities = [],
  }) => {
    await axios.post(
      `${WIT_AI_BASE_URL}/samples`,
      [
        {
          text,
          entities: [
            {
              entity: 'intent',
              value: intent_name,
            },
            ...entities,
            // {
            //   entity: entity_name,
            //   value: entity_value,
            //   start,
            //   end,
            // },
          ],
        },
      ],
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );
    const result = await this.service.insert({
      text, intent_name, entities,
    });
    return result;
  }

  /**
   * @params {String} text
   */
  removeSample = async (user_input) => {
    await axios.delete(
      `${WIT_AI_BASE_URL}/samples`,
      [{
        text: user_input,
      }],
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );
    /**
     * Sample response
     * {
     *   "sent" : true,
     *   "n" : 1 // số samples đã xóa
     * }
     */
    const result = await this.collection.update(
      { user_input },
      { deletedAt: moment().utc().format() },
    ).exec();
    return result;
  }

  fetchSamples = async () => {
    const res = await axios.get(
      `${WIT_AI_BASE_URL}/samples?limit=500`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );
    const { data } = res;
    return data;
  }
}

export default new WitAIService();
