export const toggleLeftSideBar = ({ admin }) => admin.get('toggleLeftSideBar');

const getTicketActivityData = ({ admin }) => admin.getIn(['ticketActivity', 'data'], {});

export const selectors = {
  getTicketActivityData,
};
