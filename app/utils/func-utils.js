import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';
import { ROLES } from '../../common/enums';

export function getSkipLimit(pageIndex, sizePerPage) {
  const skip = (pageIndex - 1) * sizePerPage;
  const limit = sizePerPage;
  return { skip, limit };
}

export function compareDate(a, b) {
  return moment(a).diff(moment(b));
}

export function isAgent(role) {
  return role === ROLES.FREELANCER || role === ROLES.FULLTIME;
}

export function shouldShowSystemMessage(systemMessage) {
  if (_isEmpty(systemMessage)) {
    return false;
  }
  const { message } = systemMessage;
  if (_isEmpty(message)) {
    return false;
  }
  return true;
}
