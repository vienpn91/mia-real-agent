/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import {
  TicketDetailWrapper,
  TicketDetailLeftItem,
  TicketTitle,
  TicketDetailBlock,
  TicketDetailGroupItem,
  TicketDetailItem,
  TicketDetailContent,
  TicketDetailNumber,
  TicketDetailGroupActiveItem,
  TicketDetailPercent,
} from './TicketStatistic.styled';

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

class TicketDetailStatistic extends React.PureComponent {
  renderDetailItem = (title, number, link, isAllTicket = false) => (
    <TicketDetailItem>
      <TicketDetailContent isAllTicket={isAllTicket}>
        {link ? (
          <Link to={link}> {/* eslint-disable-line*/}
            {title}
          </Link>
        ) : (
          title
        )}
      </TicketDetailContent>
      <TicketDetailNumber isAllTicket={isAllTicket}>
        {number}
      </TicketDetailNumber>
    </TicketDetailItem>
  );

  renderDetailGroup = () => (
    <TicketDetailGroupItem>
      {this.renderDetailItem(
        'All Tickets',
        100,
        '',
        true,
      )}
      {this.renderDetailItem('Tickets resolved', 50)}
      {this.renderDetailItem('Tickets pending', 15)}
    </TicketDetailGroupItem>
  );

  renderPieChart = () => {
    const data = [
      {
        name: 'Ticket resolved',
        value: 10,
      },
      {
        name: 'Ticket pending',
        value: 20,
      },
    ];

    return (
      <TicketDetailGroupActiveItem>
        <TicketDetailPercent>
          <PieChart width={ChartSize} height={ChartSize}>
            <Tooltip />
            <Pie
              data={data}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </TicketDetailPercent>
      </TicketDetailGroupActiveItem>
    );
  };

  render() {
    return (
      <TicketDetailWrapper>
        <TicketDetailLeftItem>
          <TicketTitle>Ticket Details</TicketTitle>
          <TicketDetailBlock>
            {this.renderDetailGroup()}
            {this.renderPieChart()}
          </TicketDetailBlock>
        </TicketDetailLeftItem>
      </TicketDetailWrapper>
    );
  }
}

export default TicketDetailStatistic;
