import BaseController from '../base/base.controller';
import ApplicationService from './application.service';

class ApplicationController extends BaseController {}

export default new ApplicationController(ApplicationService);
