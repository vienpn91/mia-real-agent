/* eslint-disable global-require */

/**
 * Front-end middleware
 */

import addDevMiddlewares from './addDevMiddlewares';
import addProdMiddlewares from './addProdMiddlewares';
import webpackConfig from '../../internals/webpack/webpack.dev.babel';

const frontEndMiddleware = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};

export default frontEndMiddleware;
