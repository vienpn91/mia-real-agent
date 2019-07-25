import React from 'react';
import { shape } from 'prop-types';
import {
  TicketActivityQuantityGroup, TicketActivityQuantityItem, TicketActivityQuantityContent, TicketActivityQuantityNumber
} from './UserSummary.styled';

const UserSummary = ({ userSummary: { user = 0, agent = 0 } }) => (
  <TicketActivityQuantityGroup>
    <TicketActivityQuantityItem>
      <TicketActivityQuantityContent>
        User
      </TicketActivityQuantityContent>
      <TicketActivityQuantityNumber>
        {user}
      </TicketActivityQuantityNumber>
    </TicketActivityQuantityItem>

    <TicketActivityQuantityItem>
      <TicketActivityQuantityContent>
        Agent
      </TicketActivityQuantityContent>
      <TicketActivityQuantityNumber>
        {agent}
      </TicketActivityQuantityNumber>
    </TicketActivityQuantityItem>
  </TicketActivityQuantityGroup>
);

UserSummary.propTypes = {
  userSummary: shape().isRequired,
};


export default UserSummary;
