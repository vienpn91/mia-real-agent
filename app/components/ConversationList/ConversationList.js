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
} from './ConversationList.styled';

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
  selectConversation = (conversationId) => {
    const { selectConversation } = this.props;

    selectConversation(conversationId);
    history.push(`/conversation/${conversationId}`);
  }

  renderConversationItem = (conversation, index) => {
    const { openSetting, userRole } = this.props;
    const { _id: conversationId } = conversation;
    return (
      <Menu.Item key={conversationId} onClick={() => this.selectConversation(conversationId)}>
        <ConversationItem
          number={index + 1}
          userRole={userRole}
          conversation={conversation}
          onRemove={() => this.handleRemoveConversation(conversationId)}
          onArchive={() => this.handleArchiveConversation(conversationId)}
          openSetting={openSetting}
        />
      </Menu.Item>
    );
  }

  renderConversationList = () => {
    const { conversationList } = this.props;

    return (

      <MediaQuery maxWidth={widthBreakpoint}>
        {matches => (
          <ShadowScrollbars autoHide style={matches ? scrollStyleMobile : scrollStyle}>
            <Menu>
              {conversationList.map(this.renderConversationItem)}
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
        total={this.props.total}
      />
    </ConversationPaginationWrapper>
  )

  render() {
    const { isFetchingList = {} } = this.props;
    if (isFetchingList) {
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
  userRole: PropTypes.string.isRequired,
  isFetchingList: PropTypes.bool,
  total: PropTypes.number,
  selectConversation: PropTypes.func.isRequired,
  openSetting: PropTypes.func.isRequired,
  conversationList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Conversations;
