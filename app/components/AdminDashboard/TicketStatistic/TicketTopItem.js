import React from 'react';
import {
  TopTicketItemWrapper,
  TopTicketItemThumbnail,
  TopTicketItemArticle,
  TopTicketQuantityWrapper,
  TopTicketQuantity,
} from './TicketStatistic.styled';

const ProductTopTicketItem = () => (
  <TopTicketItemWrapper>
    <TopTicketItemThumbnail>
    </TopTicketItemThumbnail>
    <TopTicketItemArticle>Artlce</TopTicketItemArticle>
    <TopTicketQuantityWrapper>
      <TopTicketQuantity>1000</TopTicketQuantity>
        Qty
    </TopTicketQuantityWrapper>
  </TopTicketItemWrapper>
);

ProductTopTicketItem.propTypes = {};

export default ProductTopTicketItem;
