import React, { Component } from 'react';
import {
  Row, Col, Tabs,
} from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import Activity from 'components/Activity';
import TicketPage from 'containers/TicketPage';
import {
  DashboardContainer,
  DashboardItem,
} from './Dashboard.styled';

const { TabPane } = Tabs;

const scrollStyle = {
  height: 'calc(100vh - 65px)',
  width: '100%',
};

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
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
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
      </ShadowScrollbars>
    );
  }
}
