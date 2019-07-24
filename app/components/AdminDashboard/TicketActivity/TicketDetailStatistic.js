/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { shape } from 'prop-types';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import {
  TicketDetailGroupActiveItem,
  TicketDetailPercent,
} from './TicketActivity.styled';

const ChartSize = 200;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const converDate = ({ resolved, pending }) => [
  {
    name: 'Ticket resolved',
    value: resolved,
  },
  {
    name: 'Ticket pending',
    value: pending,
  },
];

const TicketDetailStatistic = ({ ticketActivity }) => (
  <TicketDetailGroupActiveItem>
    <TicketDetailPercent>
      <PieChart width={ChartSize} height={ChartSize}>
        <Tooltip />
        <Pie
          data={converDate(ticketActivity)}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {converDate(ticketActivity).map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </TicketDetailPercent>
  </TicketDetailGroupActiveItem>
);

TicketDetailStatistic.propTypes = {
  ticketActivity: shape().isRequired,
};

export default TicketDetailStatistic;
