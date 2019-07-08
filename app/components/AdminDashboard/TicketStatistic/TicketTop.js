import React from 'react';
import TicketTopItem from './TicketTopItem';
import {
  TicketTopWrapper,
  TicketTopRightItem,
  TicketTopTitle,
  TicketTopHeader,
  TicketTopContent,
  TicketTopEmpty,
} from './TicketStatistic.styled';

class TicketTop extends React.PureComponent {
  renderTopItem = (item) => {
    const { _id: variantId, count } = item;
    return (
      <TicketTopItem
        key={variantId}
        variantId={variantId}
        quantity={count}
      />
    );
  };

  renderTopContent = () => {
    const TopItems = [];

    if (TopItems.loading) {
      return <TicketTopEmpty>Loading</TicketTopEmpty>;
    }

    if (TopItems.error) {
      return (
        <TicketTopEmpty>{TopItems.error}</TicketTopEmpty>
      );
    }

    const isEmpty = Array.isArray(TopItems) && TopItems.length === 0;

    if (isEmpty) {
      return (
        <TicketTopEmpty>
          No ticket were pending in this time frame
        </TicketTopEmpty>
      );
    }

    return TopItems.map(this.renderTopItem);
  };

  render() {
    // const isLoading = false;
    return (
      <TicketTopWrapper>
        {/* {isLoading && <LoadingOverlay />} */}
        <TicketTopRightItem>
          <TicketTopHeader>
            <TicketTopTitle>Top Ticket Items</TicketTopTitle>
          </TicketTopHeader>
          <TicketTopContent>
            {this.renderTopContent()}
          </TicketTopContent>
        </TicketTopRightItem>
      </TicketTopWrapper>
    );
  }
}

TicketTop.propTypes = {};

export default TicketTop;
