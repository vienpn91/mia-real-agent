import React, { Component } from 'react';
import { Button } from 'antd/lib/radio';
import { Row, Col } from 'antd';
import Ticket from './Ticket';
import {
  Wrapper, Header, Card,
  LeftContainer, RightContainer, AssignWrapper,
  AssignTitle, AssignActionBar, DashboardLogo,
  AssigneeStyled,
  TicketTitle,
} from './styles';

export class Dashboard extends Component {
  state = {
    ticket: null,
  }

  handleSelectTicket = (ticket) => {
    this.setState({
      ticket,
    });
  }

  render() {
    const { ticket } = this.state;
    return (
      <Wrapper>
        <Card>
          <Header>
            <Row>
              <Col span={7}>
                <DashboardLogo>
                  <span>Mia End-user</span>
                </DashboardLogo>
              </Col>
              <Col span={17}>
                Warning cc
              </Col>
            </Row>
          </Header>
          <Row>
            <Col span={7}>
              <LeftContainer>
                <Ticket handleSelectTicket={this.handleSelectTicket} />
              </LeftContainer>
            </Col>
            <Col span={17}>
              <RightContainer>
                {ticket
                  ? (
                    <AssignWrapper>
                      <AssignTitle>
                        <Row gutter={12}>
                          <Col span={12}>
                            <TicketTitle>
                              {`Ticket: ${ticket.title}, Assignee:`}
                            </TicketTitle>
                          </Col>
                          <Col span={12}>
                            <AssigneeStyled>
                              Assignee:
                            </AssigneeStyled>
                            Real-agent: John Wick
                          </Col>
                        </Row>
                      </AssignTitle>
                      <AssignActionBar>
                        <Button>
                          Remove
                        </Button>
                        <Button>
                          Archive
                        </Button>
                        <Button>
                          Mark as
                        </Button>
                        <Button>
                          Rate
                        </Button>
                      </AssignActionBar>
                    </AssignWrapper>
                  )
                  : (
                    <h1>Please select a ticket</h1>
                  )
                }
              </RightContainer>
            </Col>
          </Row>
        </Card>
      </Wrapper>
    );
  }
}

export default Dashboard;
