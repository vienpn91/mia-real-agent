import React from 'react';
import { Link } from 'react-router-dom';
import {
  ProfileOrganizationWrapper,
  ProfileOrganizationHead,
  ProfileOrganizationSetting,
  ProfileOrganizationItemWrapper,
  ProfileOrganizationItem,
  ProfileOrganizationContent,
  ProfileOrganizationName,
} from './ProfileUser.styled';

const ProfileOrganization = () => (
  <ProfileOrganizationWrapper>
    <ProfileOrganizationHead>
      <span>My Organizations</span>
      <Link to="/organization"> { /* eslint-disable-line */}
        <ProfileOrganizationSetting>
          <i className="icon-options" />
          Manage
        </ProfileOrganizationSetting>
      </Link>
    </ProfileOrganizationHead>
    <ProfileOrganizationItemWrapper>
      <ProfileOrganizationItem>
        <ProfileOrganizationContent>
          <ProfileOrganizationName>Tri Nguyen</ProfileOrganizationName>
        </ProfileOrganizationContent>
        <i className="icon-checkmark" />
      </ProfileOrganizationItem>
    </ProfileOrganizationItemWrapper>
  </ProfileOrganizationWrapper>
);

ProfileOrganization.propTypes = {};

export default ProfileOrganization;
