import React from 'react';
import { Translation } from 'react-i18next';

const SearchInput = () => (
  <Translation>
    {
      t => (<input type="text" placeholder={(t('SEARCH'))} />)
    }
  </Translation>
);

export default SearchInput;
