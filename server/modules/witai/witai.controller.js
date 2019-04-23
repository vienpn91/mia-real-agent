/* eslint-disable camelcase */
import axios from 'axios';
import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import WitAIService from './witai.service';

class WitAIController extends BaseController {
  constructor() {
    super(WitAIService);
  }

  createNewWitAISample = async ({
    text, intent_name, entity_name,
    entity_value, start, end,
  }) => {
    await axios.post(
      'https://api.wit.ai/samples',
      [
        {
          text,
          entities: [
            {
              entity: 'intent',
              value: intent_name,
            },
            {
              entity: entity_name,
              value: entity_value,
              start,
              end,
            },
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
  }

  insert = async (req, res) => {
    try {
      const data = req.body;
      // create new example and post it to wit.ai for training
      await this.createNewWitAISample(data);
      const result = await this.service.insert(data);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new WitAIController();
