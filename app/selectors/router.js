import _get from 'lodash/get';
import { matchPath } from 'react-router';
import { createSelector } from 'reselect';

export const getPathname = ({ router }) => _get(router, 'location.pathname');

export const getRouteMatch = routeName => createSelector(getPathname, pathName => matchPath(pathName, routeName));
