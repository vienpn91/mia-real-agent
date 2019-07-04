import React from 'react';
import TicketDetailStatistic from './TicketDetailStatistic';
import TicketTop from './TicketTop';
import { TicketStatisticSection } from './TicketStatistic.styled';

const TicketStatistic = () => (
  <TicketStatisticSection>
    <TicketDetailStatistic />
    <TicketTop />
  </TicketStatisticSection>
);

export default TicketStatistic;
