import _get from 'lodash/get';
import _last from 'lodash/last';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

export const getTokenFromReq = (req) => {
  const token = _get(req, 'headers.authorization');

  return token.replace(/^Bearer\s+/i, '');
};

export const randomPassword = () => {
  let result = '';
  for (let i = 0; i < 10; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export function getHistoryTicketUpdate(oldHistory, status) {
  let newHistory = Array.from([...(oldHistory || [])]);
  // done last ticket history
  const lastHistory = _last(newHistory);
  const lastIndex = newHistory.length - 1;
  newHistory[lastIndex] = {
    ...lastHistory,
    nextStatus: status,
    endTime: new Date(),
  };
  // push new log to ticket history
  newHistory = [
    ...newHistory,
    {
      currentStatus: status,
      startTime: new Date(),
    },
  ];
  return newHistory;
}
