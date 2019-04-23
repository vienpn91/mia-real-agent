import BaseRouter from '../base/base.route';
import WitAIController from './witai.controller';

class WitAIRouter extends BaseRouter {
  constructor() {
    super(WitAIController);
  }
}

export default new WitAIRouter();
