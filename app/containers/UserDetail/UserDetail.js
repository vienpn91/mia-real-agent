import itemDetailHoc from 'hoc/ItemDetailHoc';
import UserDetailInfo from './UserDetailInfo';
import UserDetailList from './UserDetailList';

export default itemDetailHoc(UserDetailList, UserDetailInfo);
