import witAiCollection from './witai.model';
import BaseService from '../base/base.service';

class WitAIService extends BaseService {
  constructor() {
    super(witAiCollection);
  }
}

export default new WitAIService();
