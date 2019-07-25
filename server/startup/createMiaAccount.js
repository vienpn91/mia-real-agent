import UserService from '../modules/user/user.service';
import { ROLES } from '../../common/enums';
import Logger from '../logger';

export default async function () {
  try {
    Logger.info('[STARTUP TASKS] CREATING ACCOUNT FOR MIA AGENT');
    const mia = await UserService.getByUsername('mia.agent');
    if (mia) {
      Logger.info(`[STARTUP TASKS] MIA AGENT HAS ALREADY CREATED WITH ID: ${mia._id}`);
      Logger.info('mia@miaconsult.com/whatdoyouthinkwhoyouare');
      return;
    }
    const newMia = await UserService.insert({
      username: 'mia.agent',
      email: 'mia@miaconsult.com',
      password: 'whatdoyouthinkwhoyouare',
      role: ROLES.MIA_AGENT,
    });
    if (newMia) {
      Logger.success(`[STARTUP TASKS] SUCCESSFULLY CREATED MIA AGENT WITH ID: ${newMia._id}`);
      Logger.info('mia@miaconsult.com/whatdoyouthinkwhoyouare');
    }
  } catch (error) {
    Logger.error('[STARTUP TASKS] ERROR WHY TRYING TO CREATING MIA AGENT', error);
  }
}
