import createMiaAccountTask from './createMiaAccount';
import Logger from '../logger';

const startUpTask = async () => {
  await Promise.all([
    createMiaAccountTask(),
  ]);
  Logger.info('Finished all start up tasks');
};

export default startUpTask;
