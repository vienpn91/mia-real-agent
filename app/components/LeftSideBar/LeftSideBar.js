import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _startsWith from 'lodash/startsWith';
import SidebarItem from './SideBarItem';
import {
  LeftSideBarWrapper,
  SidebarToggleButton,
  SidebarBlock,
  LogoWrapper,
  Logo,
  IconToggle,
} from './LeftSidebar.styled';

const TABS_MENU = [
  {
    key: 'dashboard',
    type: 'container',
    label: 'Dashboard',
    icon: 'mia-dashboard',
    link: '/admin/dashboard',
  },
  {
    key: 'tickets',
    type: 'container',
    label: 'Tickets',
    icon: 'mia-ticket',
    link: '/admin/tickets',
  },
  {
    key: 'users',
    type: 'container',
    label: 'Users',
    icon: 'mia-user',
    link: '/admin/user',
  },
];

const paths = _reduce(
  TABS_MENU,
  (prevValue, item) => {
    const { key, link, items } = item;

    if (items && items.length > 0) {
      const itemsPath = items.map(({ link: itemLink }) => ({
        key,
        link: itemLink,
      }));

      return [...prevValue, ...itemsPath];
    }

    return [...prevValue, { key, link }];
  },
  [],
);

class LeftSideBar extends PureComponent {
  state = {
    activeItem: '',
    isSidebarOpen: false,
  };

  componentDidMount() {
    this.selectTab();
  }

  componentDidUpdate(prevProps) {
    const { pathname: prevPathname } = prevProps;
    const { pathname } = this.props;

    // set active tab item
    if (prevPathname !== pathname) {
      this.selectTab();
    }
  }

  onToggleSidebar = () => {
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  selectTab = () => {
    const { pathname } = this.props;
    const pathItem = _find(paths, path => _startsWith(pathname, path.link));

    if (pathItem) {
      const { key } = pathItem;
      this.setState({
        activeItem: key,
      });
    }
  };

  // onLogoClick = () => {
  //   const { history } = this.props;
  //   history.push('/');
  // };

  toggleContainer = (key) => {
    this.setState((prevState) => {
      const isSelected = prevState.activeItem === key;
      return {
        activeItem: isSelected ? '' : key,
      };
    });
  };

  renderLogo = () => (
    <LogoWrapper onClick={this.onLogoClick}>
      <Logo src="/assets/images/logo-small-white.png" />
    </LogoWrapper>
  );

  renderTabItem = (tabItem) => {
    const { pathname } = this.props;
    const {
      key, label, icon, link,
    } = tabItem;
    const { activeItem, isSidebarOpen } = this.state;
    return (
      <SidebarItem
        icon={icon}
        text={label}
        link={link}
        currentUrl={pathname}
        isToggle={isSidebarOpen}
        isActive={activeItem === key}
        key={key}
      />
    );
  };

  render() {
    const { isSidebarOpen } = this.state;
    return (
      <LeftSideBarWrapper
        isToggle={isSidebarOpen}
      >
        <SidebarBlock>
          <SidebarToggleButton isToggle={isSidebarOpen}>
            {this.renderLogo()}
            <IconToggle onClick={this.onToggleSidebar} className="mia-chevron-right" />
          </SidebarToggleButton>
          {TABS_MENU.map(this.renderTabItem)}
        </SidebarBlock>
      </LeftSideBarWrapper>
    );
  }
}

LeftSideBar.propTypes = {
  pathname: PropTypes.string,
};

export default LeftSideBar;
