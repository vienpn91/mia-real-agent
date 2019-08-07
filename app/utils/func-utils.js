import moment from 'moment';

export function getSkipLimit(pageIndex, sizePerPage) {
  const skip = (pageIndex - 1) * sizePerPage;
  const limit = sizePerPage;
  return { skip, limit };
}

export function compareDate(a, b) {
  return moment(a).isAfter(moment(b));
}
