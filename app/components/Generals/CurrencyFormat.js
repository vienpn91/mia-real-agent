import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

export const CurrencyFormat = ({ value, format }) => {
  let displayValue = value;
  switch (format) {
    case 'Ticket':
      displayValue = value / 100;
      break;
    default:
      break;
  }
  return <FormattedNumber value={displayValue} format={String(format)} />;
};

CurrencyFormat.propTypes = {
  value: PropTypes.number.isRequired,
  format: PropTypes.string.isRequired,
};
