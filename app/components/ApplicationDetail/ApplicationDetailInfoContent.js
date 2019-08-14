/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import {
  OverviewLeftSectionWrapper,
  OverviewTitle,
  OverviewProduct,
  InfoContentBlock,
} from 'components/Generals/ItemDetail.styled';
import { Tabs, Icon } from 'antd';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../utils/constants';
import {
  ArrayTagWrapper, DescriptionWrapper,
  DescriptionNumber, TagAction,
} from './styles';
import ApplicationDetailExperienceDetail from './ApplicationDetailExperienceDetail';
import ApplicationDetailEducationDetail from './ApplicationDetailEducationDetail';

const { TabPane } = Tabs;

const MENU = {
  EXPERIENCES: 'EXPERIENCES',
  EDUCATIONS: 'EDUCATIONS',
  LANGUAGES: 'LANGUAGES',
};

class ApplicationDetailInfoContent extends PureComponent {
  state = {
    current: MENU.EXPERIENCES,
    isExperienceDetailOpen: false,
    experienceDetail: null,
    isEducationDetailOpen: false,
    educationDetail: null,
  }

  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <label>{label}</label>
      <span>{value instanceof Array ? value.join(', ') || '-' : (value || '-')}</span>
    </OverviewProduct>
  );

  toggleExperienceDetail = (isExperienceDetailOpen = false, experienceDetail) => {
    this.setState({
      isExperienceDetailOpen,
      experienceDetail,
    });
  }

  toggleEducationDetail = (isEducationDetailOpen = false, educationDetail) => {
    this.setState({
      isEducationDetailOpen,
      educationDetail,
    });
  }

  handleChangeTab = (key) => {
    this.setState({
      current: key,
    });
  }

  renderTabMenu = () => {
    const { current } = this.state;
    const {
      applicationDetail: {
        workExperiences, educations, languages,
      },
    } = this.props;
    return (
      <Tabs activeKey={current} onChange={this.handleChangeTab}>
        <TabPane tab="Experiences" key={MENU.EXPERIENCES}>
          {_isEmpty(workExperiences)
            ? 'No experience'
            : workExperiences.map(({ title, company, ...rest }, index) => this.renderArrayItem(
              index, title, [{
                description: company,
              }],
              () => this.toggleExperienceDetail(true, { title, company, ...rest })
            ))}
        </TabPane>
        <TabPane tab="Educations" key={MENU.EDUCATIONS}>
          {_isEmpty(educations)
            ? 'No education'
            : educations.map(({
              school, degree, gpa, ...rest
            }, index) => this.renderArrayItem(
              index, school, [{
                description: degree,
              },
              {
                description: 'GPA',
                value: gpa,
              }],
              () => this.toggleEducationDetail(true, {
                school, degree, gpa, ...rest,
              })
            ))}
        </TabPane>
        <TabPane tab="Languages" key={MENU.LANGUAGES}>
          {_isEmpty(languages)
            ? 'No language'
            : languages.map(({
              name, writing,
              reading, speaking, overall,
            }, index) => this.renderArrayItem(
              index, name, [
                {
                  description: 'Writing',
                  value: writing,
                },
                {
                  description: 'Reading',
                  value: reading,
                },
                {
                  description: 'Speaking',
                  value: speaking,
                },
                {
                  description: 'Overall',
                  value: overall,
                },
              ]
            ))}
        </TabPane>
      </Tabs>
    );
  }

  renderArrayItem = (index, title, descriptions, onClick) => (
    <ArrayTagWrapper key={index} onClick={onClick || (() => { })}>
      <h2>
        {title}
      </h2>
      {
        onClick && (
          <TagAction>
            <Icon
              onClick={onClick}
              type="info-circle"
            />
          </TagAction>
        )
      }
      {
        descriptions.map(({ description, value }) => (
          <DescriptionWrapper key={`${description}${value}`}>
            <p>
              {description}
            </p>
            <DescriptionNumber>{value}</DescriptionNumber>
          </DescriptionWrapper>
        ))
      }
    </ArrayTagWrapper>
  );

  renderItemOverview = () => {
    const {
      isExperienceDetailOpen, experienceDetail,
      isEducationDetailOpen, educationDetail,
    } = this.state;
    const {
      applicationDetail: {
        firstName, lastName, email, cv,
        role, categories, skills, createdAt,
      },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>Primary Details</OverviewTitle>
        {this.renderOverviewInfo('First name', firstName)}
        {this.renderOverviewInfo('Last name', lastName)}
        {this.renderOverviewInfo('Email', email)}
        {this.renderOverviewInfo('Role', role)}
        {this.renderOverviewInfo('Categories', categories)}
        {this.renderOverviewInfo('Skills', skills)}
        {this.renderOverviewInfo('Created at', moment(createdAt).format(DATE_TIME_FORMAT.DATE))}
        {this.renderOverviewInfo('CV', cv, true)}
        {this.renderTabMenu()}
        <ApplicationDetailExperienceDetail
          isOpen={isExperienceDetailOpen}
          experience={experienceDetail}
          handleClose={() => this.toggleExperienceDetail(false)}
        />
        <ApplicationDetailEducationDetail
          isOpen={isEducationDetailOpen}
          education={educationDetail}
          handleClose={() => this.toggleEducationDetail(false)}
        />
      </OverviewLeftSectionWrapper>
    );
  };

  render() {
    return (
      <InfoContentBlock>
        {this.renderItemOverview()}
      </InfoContentBlock>
    );
  }
}

ApplicationDetailInfoContent.propTypes = {
  applicationDetail: PropTypes.object.isRequired,
};

export default ApplicationDetailInfoContent;
