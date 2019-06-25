import React, { Component } from 'react';
import {
  Row, Col, Tabs,
} from 'antd';
import Activity from 'components/Activity';
import TicketPage from 'components/TicketPage';
import {
  DashboardContainer,
  DashboardItem,
} from './Dashboard.styled';

const { TabPane } = Tabs;
export default class Dashboard extends Component {
  renderActivityItem = () => (
    <TabPane tab="Activity" key="1">
      <Activity />
    </TabPane>
  )

  renderTicketItem = () => (
    <TabPane tab="Ticket" key="2">
      <TicketPage />
    </TabPane>
  )

  render() {
    return (
      <DashboardContainer>
        <DashboardItem>
          <Row type="flex" justify="center" style={{ height: '100%' }}>
            <Col span={20}>
              <Tabs defaultActiveKey="2" style={{ height: '100%' }}>
                {this.renderActivityItem()}
                {this.renderTicketItem()}
              </Tabs>
            </Col>
          </Row>
        </DashboardItem>
      </DashboardContainer>
    );
  }
}
