/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import ShadowScrollbars from 'components/Scrollbar';
import { func, array } from 'prop-types';
import {
  Menu, Select, Pagination, Popover, Icon,
} from 'antd';
import {
  ConversationItemWrapper,
  ConversationGroup,
  ConversationName,
  ConversationTime,
  ConversationStatus,
  ConversationFilterWrapper,
  ConversationPaginationWrapper,
  ConversationGroupAction,
  ConversationButton,
} from '../Chatbot.styled';

const scrollStyle = {
  height: 'calc(100vh - 310px)',
  width: '100%',
};

const scrollStyleMobile = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};

export default class ConversationItem extends Component {
  static propTypes = {
    handleSelectConversation: func.isRequired,
    categories: array.isRequired,
    ticketData: array.isRequired,
  }

  state = {
    current: 1,
    filter: [],
    visible: false,
  }

  handleChangeFilter = (values) => {
    this.setState({
      filter: values,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  getFilteredList = () => {
    const { current, filter } = this.state;
    const { ticketData } = this.props;
    if (filter.length === 0) {
      return ticketData;
    }
    const filteredList = ticketData.filter(({
      category,
    }) => filter.find(filterCategory => category.indexOf(filterCategory) >= 0));
    if ((current - 1) * 10 > filteredList.length) {
      this.setState({
        current: 1,
      });
    }
    return filteredList;
  }

  handleSelect = (ticket) => {
    const { handleSelectConversation } = this.props;
    handleSelectConversation(ticket);
  }

  renderGroupAction = () => (
    <ConversationGroupAction>
      <ConversationButton>Remove</ConversationButton>
      <ConversationButton>Archive</ConversationButton>
      <ConversationButton>Mark as</ConversationButton>
      <ConversationButton>Rate</ConversationButton>
    </ConversationGroupAction>

  )

  renderConversationList = () => {
    const { current, visible } = this.state;
    const { ticketData } = this.props;
    return (
      <MediaQuery maxWidth={840}>
        {matches => (
          <ShadowScrollbars autoHide style={matches ? scrollStyleMobile : scrollStyle}>
            <Menu>
              {ticketData.slice((current - 1) * 10, current * 10).map((ticket, index) => (
                <Menu.Item key={index} onClick={() => this.handleSelect(ticket)}>
                  <ConversationGroup>
                    <ConversationName>{ticket.title}</ConversationName>
                    <ConversationStatus status={ticket.status}>
                      <span>{ticket.category}</span>
                      <span>-</span>
                      <span>{ticket.status}</span>
                    </ConversationStatus>
                  </ConversationGroup>
                  <ConversationTime>
                    <span>{ticket.lastestTime}</span>
                    <Popover
                      content={this.renderGroupAction()}
                      title="More action"
                      trigger="click"
                      visible={visible}
                      placement="bottom"
                      onVisibleChange={this.handleVisibleChange}
                    >
                      <Icon type="setting" />
                    </Popover>
                  </ConversationTime>

                </Menu.Item>
              ))}
            </Menu>
          </ShadowScrollbars>
        )}
      </MediaQuery>
    );
  }

  handleChangeFilter = (values) => {
    this.setState({
      filter: values,
    });
  }

  handleChangePage = (value) => {
    this.setState({
      current: value,
    });
  }

  renderConversationFilter = () => {
    const { categories } = this.props;
    return (
      <ConversationFilterWrapper>
        <span>Filter by categories:</span>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          onChange={this.handleChangeFilter}
        >
          {categories.map((cat, index) => (
            <Select.Option key={index} value={cat}>{cat}</Select.Option>
          ))}
        </Select>
      </ConversationFilterWrapper>
    );
  }

  renderConversationPagination = () => {
    const { current } = this.state;
    return (
      <ConversationPaginationWrapper>
        <Pagination
          onChange={this.handleChangePage}
          current={current}
          showLessItems
          size="small"
          pageSize={5}
          total={this.getFilteredList().length}
        />
      </ConversationPaginationWrapper>
    );
  }

  render() {
    return (
      <ConversationItemWrapper>
        {this.renderConversationList()}
        {this.renderConversationFilter()}
        {this.renderConversationPagination()}
      </ConversationItemWrapper>
    );
  }
}
