import { Router } from 'express';
import { ROLES } from '../../../common/enums';
import { allow } from '../../middlewares/verifyMiddlewares';

/* routers */
import TicketRouter from './ticket/ticket.route';
import UserRouter from './user/user.route';
import ApplicationRouter from './application/application.route';

const router = Router();

router.use(allow(ROLES.ADMIN));
router.use('/tickets', TicketRouter.router);
router.use('/applications', ApplicationRouter.router);
router.use('/users', UserRouter.router);

export default { router };
