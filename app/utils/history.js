import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const removeParamFromUrl = url => url.replace(/\/:[A-Za-z]+\?/g, '');
export default history;
