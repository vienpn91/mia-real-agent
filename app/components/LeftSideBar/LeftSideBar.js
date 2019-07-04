import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _startsWith from 'lodash/startsWith';
import MediaQuery from 'react-responsive';
import SidebarItem from './SideBarItem';
import { LeftSideBarStyled, SidebarToggleButton, SidebarBlockStyled } from './LeftSidebar.styled';
import { IconStyled } from '../Generals/general.styles';

const TABS_MENU = [
  {
    key: 'dashboard',
    type: 'container',
    label: 'Dashboard',
    icon: 'icon-home',
    link: '/dashboard',
  },
  {
    key: 'interface',
    type: 'container',
    label: 'Interface',
    icon: 'icon-home',
    items: [
      {
        label: 'Banners',
        link: '/banner',
      },
      {
        label: 'Homepage',
        link: '/editor/homepage',
      },
    ],
  },
  {
    key: 'promotion',
    type: 'container',
    label: 'Promotions',
    icon: 'icon-percent',
    link: '/promos',
  },
  {
    key: 'items',
    type: 'container',
    label: 'Inventory',
    icon: 'icon-checkout',
    link: '/items',
    items: [
      {
        label: 'Categories',
        link: '/categories',
      },
      {
        label: 'Products',
        link: '/products',
      },
      { label: 'SKU', link: '/sku' },
    ],
  },
  {
    key: 'packages',
    type: 'container',
    label: 'Packages',
    icon: 'icon-package',
    link: '/package',
  },
  {
    key: 'saleOrders',
    type: 'container',
    label: 'Sale Orders',
    icon: 'icon-shopping',
    link: '/orders',
  },
  {
    key: 'purchaseOrders',
    type: 'container',
    label: 'Purchase Orders',
    icon: 'icon-shopping-bag',
    link: '/purchase-order',
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

  toggleContainer = (key) => {
    this.setState((prevState) => {
      const isSelected = prevState.activeItem === key;
      return {
        activeItem: isSelected ? '' : key,
      };
    });
  };

  renderTabItem = (tabItem) => {
    const { pathname, isOpen } = this.props;
    const {
      key, label, icon, link, items,
    } = tabItem;
    const { activeItem } = this.state;
    return (
      <SidebarItem
        isActive={activeItem === key}
        link={link}
        key={key}
        itemKey={key}
        icon={icon}
        text={label}
        items={items}
        currentUrl={pathname}
        toggleContainer={this.toggleContainer}
        isOpen={isOpen}
      />
    );
  };

  render() {
    const { isOpen, onToggleSidebar } = this.props;
    return (
      <LeftSideBarStyled
        onMouseEnter={onToggleSidebar}
        onMouseLeave={onToggleSidebar}
        isOpen={isOpen}
      >
        <SidebarBlockStyled>
          <MediaQuery maxWidth={1280}>
            <SidebarToggleButton isOpen={isOpen}>
              <IconStyled className="icon-next" />
            </SidebarToggleButton>
          </MediaQuery>
          {TABS_MENU.map(this.renderTabItem)}
        </SidebarBlockStyled>
      </LeftSideBarStyled>
    );
  }
}

LeftSideBar.propTypes = {
  isOpen: PropTypes.bool,
  pathname: PropTypes.string,
  onToggleSidebar: PropTypes.func,
};

export default LeftSideBar;
