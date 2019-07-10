import { Router } from 'express';
import { ROLES } from '../../../common/enums';
import { allow } from '../../middlewares/verifyMiddlewares';

/* routers */
import AdminTicketRouter from './ticket/ticket.route';

const router = Router();

router.use(allow(ROLES.ADMIN));
router.use('/tickets', AdminTicketRouter.router);

export default { router };
