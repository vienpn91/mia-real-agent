import moment from 'moment';
import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Trans } from 'react-i18next';
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
  return role === ROLES.FREELANCER || role === ROLES.DEDICATED;
}

export function shouldShowSystemMessage(systemMessage, currentConversationId) {
  if (_isEmpty(systemMessage)) {
    return false;
  }
  const { message, conversationId } = systemMessage;
  if (_isEmpty(message) || currentConversationId !== conversationId) {
    return false;
  }
  return true;
}

export const toI18n = key => (
  <Trans i18nKey={key} />
);
