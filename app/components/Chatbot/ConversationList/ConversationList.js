import React from 'react';
import PropTypes, { string, func, bool } from 'prop-types';
import SpinnerLoading from 'components/PageLoading';
import ShadowScrollbars from 'components/Scrollbar';
import MediaQuery from 'react-responsive';
import history from 'utils/history';
import {
  Menu, Select, Pagination,
} from 'antd';
import ConversationItem from './ConversationItem';
import {
  ConversationItemWrapper,
  ConversationFilterWrapper,
  ConversationPaginationWrapper,
} from '../Chatbot.styled';

const categories = [
  'Finance',
  'Law',
  'Insurrance',
];

const widthBreakpoint = 768;
const scrollStyle = {
  height: 'calc(100vh - 250px)',
  width: '100%',
};

const scrollStyleMobile = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};

class Conversations extends React.PureComponent {
  componentDidMount() {
    const { getAllAction } = this.props;

    getAllAction();
  }

  selectConversation = (conversationId) => {
    const { selectConversation } = this.props;

    selectConversation(conversationId);
    history.push(`/conversation/${conversationId}`);
  }

  handleArchiveConversation = (conversationId) => {
    const { archiveConversation } = this.props;
    archiveConversation(conversationId);
  }

  renderConversationItem = (ticket) => {
    const { openSetting, userRole } = this.props;
    const { _id, conversationId } = ticket;
    return (
      <Menu.Item key={_id} onClick={() => this.selectConversation(conversationId)}>
        <ConversationItem
          userRole={userRole}
          ticket={ticket}
          onRemove={() => this.handleRemoveConversation(conversationId)}
          onArchive={() => this.handleArchiveConversation(conversationId)}
          openSetting={openSetting}
        />
      </Menu.Item>
    );
  }

  renderConversationList = () => {
    const { tickets } = this.props;
    return (

      <MediaQuery maxWidth={widthBreakpoint}>
        {matches => (
          <ShadowScrollbars autoHide style={matches ? scrollStyleMobile : scrollStyle}>
            <Menu>
              {tickets.map(this.renderConversationItem)}
            </Menu>
          </ShadowScrollbars>
        )}
      </MediaQuery>
    );
  }

  renderConversationFilter = () => (
    <ConversationFilterWrapper>
      <span>Filter by categories:</span>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        onChange={this.handleChangeFilter}
      >
        {categories.map((cat, index) => (
          <Select.Option key={index} value={cat}>{cat}</Select.Option> // eslint-disable-line
        ))}
      </Select>
    </ConversationFilterWrapper>
  )

  // should apply later
  renderConversationPagination = () => (
    <ConversationPaginationWrapper>
      <Pagination
        current={1}
        showLessItems
        size="small"
        pageSize={5}
        total={15}
      />
    </ConversationPaginationWrapper>
  )

  render() {
    const { fetchingContext = {}, isArchiving } = this.props;
    const { isFetching } = fetchingContext;
    const loading = isFetching || isArchiving;
    if (loading) {
      return <SpinnerLoading />;
    }

    return (
      <ConversationItemWrapper>
        {this.renderConversationList()}
        {this.renderConversationFilter()}
        {this.renderConversationPagination()}
      </ConversationItemWrapper>
    );
  }
}

Conversations.propTypes = {
  isArchiving: bool.isRequired,
  tickets: PropTypes.array,
  getAllAction: PropTypes.func,
  fetchingContext: PropTypes.object,
  userRole: string.isRequired,
  openSetting: func,
  archiveConversation: func.isRequired,
  selectConversation: func.isRequired,
};

export default Conversations;
