import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from 'components/HeaderContainer/HeaderContainer';
import { PageWrapper } from 'components/PermissionDeniedPage/PermissionDeniedPage.styled';
import { DashboardWrapperStyled } from 'components/AdminDashboard/AdminDashboard.styled';
import ErrorContent from 'components/ErrorContent';

const ItemManagementHoc = (ItemsManagementTable) => {
  class ItemManagementWrapper extends React.PureComponent {
    render() {
      const {
        handleSort,
        currentSorting,
        sortItems,
        createEndpoint,
        title,
        shouldRenderNewButton = true,
        shouldRenderSendEmailButton = false,
        openModal,
        filterItems,
        handleFilter,
        currentFiltering,
        shouldRenderFilter,
        errorMsg,
        toggleLeftSideBar,
      } = this.props;

      if (errorMsg) {
        return (
          <PageWrapper>
            <ErrorContent error={errorMsg} />
          </PageWrapper>
        );
      }

      return (
        <DashboardWrapperStyled isToggle={toggleLeftSideBar}>
          <HeaderContainer
            sortItem={sortItems}
            url={createEndpoint}
            handleSort={handleSort}
            sorting={currentSorting}
            title={title}
            shouldRenderNewButton={shouldRenderNewButton}
            shouldRenderSendEmailButton={shouldRenderSendEmailButton}
            openModal={openModal}
            filterItems={filterItems}
            handleFilter={handleFilter}
            filtering={currentFiltering}
            shouldRenderFilter={shouldRenderFilter}
          />
          <ItemsManagementTable />
        </DashboardWrapperStyled>
      );
    }
  }

  ItemManagementWrapper.propTypes = {
    toggleLeftSideBar: PropTypes.bool.isRequired,
    handleSort: PropTypes.func.isRequired,
    currentSorting: PropTypes.object.isRequired,
    sortItems: PropTypes.array.isRequired,
    createEndpoint: PropTypes.string,
    title: PropTypes.string,
    shouldRenderNewButton: PropTypes.bool,
    shouldRenderSendEmailButton: PropTypes.bool,
    openModal: PropTypes.func,
    filterItems: PropTypes.array,
    handleFilter: PropTypes.func,
    currentFiltering: PropTypes.object,
    shouldRenderFilter: PropTypes.bool,
    errorMsg: PropTypes.string,
  };

  return ItemManagementWrapper;
};

export default ItemManagementHoc;
