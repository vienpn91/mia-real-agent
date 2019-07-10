import { Router } from 'express';
import AgentController from './agent.controller';

class AgentRouter {
  constructor(controller) {
    this.router = Router();
    this.router.post(
      '/search',
      controller.findAgent,
    );
    this.router.post(
      '/:id/accept',
      controller.acceptRequest,
    );
    this.router.param('id', controller.load);
  }
}

export default new AgentRouter(AgentController);
