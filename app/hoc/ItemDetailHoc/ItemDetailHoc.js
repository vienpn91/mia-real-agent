import React from 'react';
import { ItemDetailWrapper } from 'components/Generals/ItemDetail.styled';

const ItemDetailHoc = (ItemDetailList, ItemDetailInfo) =>
  class extends React.PureComponent { // eslint-disable-line
    render() {
      return (
        <ItemDetailWrapper>
          <ItemDetailList />
          <ItemDetailInfo />
        </ItemDetailWrapper>
      );
    }
  };

export default ItemDetailHoc;
