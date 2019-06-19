import React, { PureComponent } from 'react';
import { Pagination, Button, Select } from 'antd';
import { func } from 'prop-types';
import TicketList from './TicketList/TicketList';
import {
  PaginationWrapper, CreateButtonWrapper,
  TicketListWrapper, ActionBar, TicketListTitle,
} from './styles';

const categories = [
  'A',
  'B',
  'C',
];

const randomCategory = () => {
  const category = [];
  category.push(categories[Math.floor(Math.random() * categories.length)]);
  return category;
};

export default class Ticket extends PureComponent {
  static propTypes = {
    handleSelectTicket: func.isRequired,
  }

  state = {
    current: 1,
    list: [
      { title: 'cc1', category: randomCategory() },
      { title: 'cc2', category: randomCategory() },
      { title: 'cc3', category: randomCategory() },
      { title: 'cc4', category: randomCategory() },
      { title: 'cc5', category: randomCategory() },
      { title: 'cc6', category: randomCategory() },
      { title: 'cc7', category: randomCategory() },
      { title: 'cc8', category: randomCategory() },
      { title: 'cc9', category: randomCategory() },
      { title: 'cc10', category: randomCategory() },
      { title: 'cc11', category: randomCategory() },
      { title: 'cc12', category: randomCategory() },
      { title: 'cc13', category: randomCategory() },
    ],
    filter: [],
  }

  getFilteredList = () => {
    const { current, list, filter } = this.state;
    if (filter.length === 0) {
      return list;
    }
    const filteredList = list.filter(({
      category,
    }) => filter.find(filterCategory => category.indexOf(filterCategory) >= 0));
    if ((current - 1) * 5 > filteredList.length) {
      this.setState({
        current: 1,
      });
    }
    return filteredList;
  }

  createTicket = () => {
    const { list } = this.state;
    this.setState({
      list: [...list, { title: `cc${list.length + 1}`, category: randomCategory() }],
    });
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

  render() {
    const { current } = this.state;
    const { handleSelectTicket } = this.props;
    return (
      <div>
        <TicketListTitle>Tickets:</TicketListTitle>
        <TicketListWrapper>
          <TicketList
            handleSelectTicket={handleSelectTicket}
            current={current}
            list={this.getFilteredList()}
          />
        </TicketListWrapper>
        <ActionBar>
          Filter by categories:
          <br />
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            onChange={this.handleChangeFilter}
          >
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
            <Select.Option value="C">C</Select.Option>
          </Select>
          <PaginationWrapper>
            <Pagination
              onChange={this.handleChangePage}
              current={current}
              showLessItems
              size="small"
              pageSize={5}
              total={this.getFilteredList().length}
            />
          </PaginationWrapper>
          <CreateButtonWrapper>
            <Button onClick={this.createTicket}>
              Create ticket
            </Button>
          </CreateButtonWrapper>
        </ActionBar>
      </div>
    );
  }
}
