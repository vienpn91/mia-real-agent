import React, { Component } from 'react';
import {
  Row, Col, List, Avatar, Tabs, Icon,
} from 'antd';
import TopNavBar from '../TopNavBar/TopNavBar';
import {
  DashboardInfoUser,
  DashboardContainer,
  DashboardLink,
  DashboardTime,
  DashboardDesc,
  DashboardContent,
  DashboardLeftBlock,
  DashboardRightBlock,
  DashboardSubTitle,
  DashboardLinkTitle,
  DashboardSubDesc,
} from './styles';

const { TabPane } = Tabs;
export default class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <TopNavBar />
        <Row type="flex" justify="center">
          <Col span={12}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="All activity" key="1">
                <List itemLayout="vertical" size="large">
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={48} />}
                      title={(
                        <DashboardInfoUser>
                          <DashboardLink href="https://ant.design">Long Hoang</DashboardLink>
                          <DashboardDesc>merged a pull request in</DashboardDesc>
                          <DashboardLink href="https://ant.design">ZigvyCorp/Lead-manager</DashboardLink>
                          <DashboardTime>8 hours ago</DashboardTime>
                        </DashboardInfoUser>
                      )}
                      description={(
                        <DashboardContent>
                          <DashboardLeftBlock>
                            <Icon twoToneColor="#28a745" type="exclamation-circle" theme="twoTone" />
                          </DashboardLeftBlock>
                          <DashboardRightBlock>
                            <DashboardSubTitle>
                              <DashboardLinkTitle>Calculating billable hours </DashboardLinkTitle>
                              <DashboardDesc>#267 </DashboardDesc>
                            </DashboardSubTitle>
                            <DashboardSubDesc>
                              The report doesn't have total billable hours Implement
                              a dropdown with 2 options on 2 Weekly timesheet report screen Billable Working hour When
                            </DashboardSubDesc>
                          </DashboardRightBlock>
                        </DashboardContent>
                      )}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" icon="user" size={48} />}
                      title={(
                        <DashboardInfoUser>
                          <DashboardLink href="https://ant.design">Long Hoang</DashboardLink>
                          <DashboardDesc>pushed to</DashboardDesc>
                          <DashboardLink href="https://ant.design">ZigvyCorp/Lead-manager</DashboardLink>
                          <DashboardTime>8 hours ago</DashboardTime>
                        </DashboardInfoUser>
                      )}
                      description={(
                        <DashboardContent>
                          <DashboardLeftBlock>
                            <Icon twoToneColor="#28a745" type="exclamation-circle" theme="twoTone" />
                          </DashboardLeftBlock>
                          <DashboardRightBlock>
                            <DashboardSubTitle>
                              <DashboardLinkTitle>Calculating billable hours </DashboardLinkTitle>
                              <DashboardDesc>#267 </DashboardDesc>
                            </DashboardSubTitle>
                            <DashboardSubDesc>
                              The report doesn't have total billable hours Implement
                              a dropdown with 2 options on 2 Weekly timesheet report screen Billable Working hour When 
                            </DashboardSubDesc>
                          </DashboardRightBlock>
                        </DashboardContent>
                      )}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={48} />}
                      
                      title={(
                        <DashboardInfoUser>
                          <DashboardLink href="https://ant.design">Long Hoang</DashboardLink>
                          <DashboardDesc>opened a pull request in</DashboardDesc>
                          <DashboardLink href="https://ant.design">ZigvyCorp/Lead-manager</DashboardLink>
                          <DashboardTime>8 hours ago</DashboardTime>
                        </DashboardInfoUser>
                      )}
                      description={(
                        <DashboardContent>
                          <DashboardLeftBlock>
                            <Icon twoToneColor="#28a745" type="exclamation-circle" theme="twoTone" />
                          </DashboardLeftBlock>
                          <DashboardRightBlock>
                            <DashboardSubTitle>
                              <DashboardLinkTitle>Enhance `User-Project Timesheet Details`</DashboardLinkTitle>
                              <DashboardDesc>#266 </DashboardDesc>
                            </DashboardSubTitle>
                            <DashboardSubDesc>
                              The report doesn't have total billable hours Implement
                              a dropdown with 2 options on 2 Weekly timesheet report screen Billable Working hour When
                            </DashboardSubDesc>
                          </DashboardRightBlock>
                        </DashboardContent>
                      )}
                    />
                  </List.Item>
                </List>
              </TabPane>
              <TabPane tab="Ticket" key="2">
                <Row type="flex" justify="center">
                  <Col span={4}>col-4</Col>
                  <Col span={4}>col-4</Col>
                  <Col span={4}>col-4</Col>
                  <Col span={4}>col-4</Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </DashboardContainer>
    );
  }
}
