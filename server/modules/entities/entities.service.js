import entitiesCollection from './entities.model';
import BaseService from '../base/base.service';

class EntitiesService extends BaseService {
  constructor() {
    super(entitiesCollection);
  }
}

export default new EntitiesService();
