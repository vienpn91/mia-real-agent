import React from 'react';
import { shape } from 'prop-types';
import {
  TicketActivityQuantityGroup, TicketActivityQuantityItem, TicketActivityQuantityContent, TicketActivityQuantityNumber
} from './ApplicationSummary.styled';

const ApplicationSummary = ({ applicationSummary: { pending = 0, reviewing = 0 } }) => (
  <TicketActivityQuantityGroup>
    <TicketActivityQuantityItem>
      <TicketActivityQuantityContent>
        Waiting for review
      </TicketActivityQuantityContent>
      <TicketActivityQuantityNumber>
        {pending}
      </TicketActivityQuantityNumber>
    </TicketActivityQuantityItem>

    <TicketActivityQuantityItem>
      <TicketActivityQuantityContent>
        Reviewing
      </TicketActivityQuantityContent>
      <TicketActivityQuantityNumber>
        {reviewing}
      </TicketActivityQuantityNumber>
    </TicketActivityQuantityItem>
  </TicketActivityQuantityGroup>
);

ApplicationSummary.propTypes = {
  applicationSummary: shape().isRequired,
};


export default ApplicationSummary;
