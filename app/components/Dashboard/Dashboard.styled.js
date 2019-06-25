import styled from 'styled-components';

export const DashboardContainer = styled.section`
  background-color: #fff;
  height: 100vh;
  width: 100%;
`;

export const DashboardItem = styled.div`
  width: calc(100% - 30px);
  max-width: 960px;
  height: 100%;
  margin: 0 auto;
  .ant-tabs-nav .ant-tabs-tab {
    &:hover {
      color: #ff5402;
    }
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #ff5402;
  }
  .ant-tabs-ink-bar {
    background-color: #ff5402;
  }
`;
