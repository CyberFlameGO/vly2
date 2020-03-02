import { defaultToHttpScheme } from '../../lib/urlUtil'
import { Divider, Icon } from 'antd'
import Markdown from 'markdown-to-jsx'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import MemberUl from '../Member/MemberUl'
import TagDisplay from '../Tags/TagDisplay'
import { GridContainer, H1, H3Bold, H4, ActivityContainer } from '../VTheme/VTheme'
import PersonRoles from './PersonRole'
import PersonPronouns from './PersonPronoun'
import { PersonBadgeSection } from './PersonBadge'
import { VBanner, VBannerImg, ProfileBannerTitle } from '../VTheme/Profile'

const DetailItem = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
const DetailItemMobile = styled.div`
  display: none;

  @media screen and (max-width: 767px) {
    display: initial;
    margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  }
`

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`

const InfoSection = styled.div`
  background-color: none;
  min-height: 5rem;
  margin-bottom: 2rem;
`
const PersonUl = styled.ul`
  list-style: none;
  padding:0;
  margin:0;
  @media screen and (min-width: 767px) {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }
`

const PersonDetail = ({ person }, ...props) => (
  <div>
    <Head title={person.nickname} />
    <VBanner>
      <VBannerImg src={person.imgUrl} alt={person.nickname} />
      <ProfileBannerTitle>
        <h1>{person.name}</h1>

        <p>{person.job && `${person.job}`} {person.placeOfWork && `- ${person.placeOfWork}`}</p>

      </ProfileBannerTitle>
    </VBanner>
    <Divider />
    <ActivityContainer>
      <h2>About</h2>
      <div>
        <Markdown children={person.about || ''} />
        <Divider />
        <h5>
          <FormattedMessage
            defaultMessage='Interests and Skills'
            id='person.skills.title'
            description='subheading for tags on person details page'
          />
        </h5>
        <TagDisplay tags={person.tags} />
      </div>

    </ActivityContainer>
    <Divider />
    <ActivityContainer>
      <h2>Contact</h2>
      <InfoSection>
        <PersonUl>

          <li>
            <a href={`mailto:${person.email}`}>
              <StyledIcon type='mail' />
              {person.email}
            </a>
          </li>
          {person.phone &&
            <li>
              <a href={`tel:${person.phone}`}>
                <StyledIcon type='phone' />
                {person.phone}
              </a>
            </li>}
          {person.website &&
            <li>
              <a href={defaultToHttpScheme(person.website)} rel='noopener noreferrer' target='_blank'>
                <StyledIcon type='global' />
                {person.website}
              </a>
            </li>}
          {person.facebook &&
            <li>
              <a href={`https://www.facebook.com/${person.facebook}`} rel='noopener noreferrer' target='_blank'>
                <StyledIcon type='facebook' />
                {person.facebook}
              </a>
            </li>}
          {person.twitter &&
            <li>
              <a href={`https://www.twitter.com/${person.twitter}`} rel='noopener noreferrer' target='_blank'>
                <StyledIcon type='twitter' />
                {person.twitter}
              </a>
            </li>}
          {person.location &&
            <li>
              <StyledIcon type='compass' />
              {person.location}
            </li>}
          {person.pronoun &&
            <li>
              <StyledIcon type='idcard' />
              <PersonPronouns pronoun={person.pronoun} />
            </li>}
          {person.role &&
            <li>
              <StyledIcon type='coffee' />
              <PersonRoles roles={person.role} />
            </li>}
          {person.education &&
            <li>
              <StyledIcon type='book' />
              {person.education}
            </li>}
          {person.placeOfWork &&
            <li>
              <StyledIcon type='bank' />
              {person.placeOfWork}
            </li>}
          {person.job &&
            <li>
              <StyledIcon type='coffee' />
              {person.job}
            </li>}
        </PersonUl>
      </InfoSection>
    </ActivityContainer>
    <Divider />
    <ActivityContainer>
      <h2>
        <FormattedMessage
          id='PersonDetail.subheading.membership'
          defaultMessage='Member of'
          description='Header for list of orgs I belong to'
        />
      </h2>
      <div>
        <MemberUl members={person.orgMembership} />
        {person.orgMembership &&
          <DetailItem />}
        {person.orgFollowership &&
          <DetailItem>
            <h5>
              <FormattedMessage
                id='PersonDetail.subheading.following'
                defaultMessage='Following'
                description='Header for list of orgs I follow'
              />
            </h5>
            <MemberUl members={person.orgFollowership} />
          </DetailItem>}
      </div>
    </ActivityContainer>
    <Divider />
    <ActivityContainer>

      <h2>
        <FormattedMessage
          id='PersonDetail.subheading.achievements'
          defaultMessage='Recognition'
          description='Header for list of badges I have obtained'
        />
      </h2>

      <PersonBadgeSection person={person} />
    </ActivityContainer>

    <DetailItemMobile>
      <p><Icon type='history' /> </p>
    </DetailItemMobile>
    <DetailItemMobile>
      <p><Icon type='safety' /> </p>
    </DetailItemMobile>
    <Divider />
  </div>

)

PersonDetail.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string,
    about: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
    job: PropTypes.string,
    pronoun: PropTypes.object,
    imgUrl: PropTypes.any,
    imgUrlSm: PropTypes.string,
    placeOfWork: PropTypes.string,
    role: PropTypes.arrayOf(
      PropTypes.oneOf([
        'admin',
        'opportunityProvider',
        'volunteer',
        'activityProvider',
        'tester',
        'orgAdmin'
      ])
    ),
    status: PropTypes.oneOf(['active', 'inactive', 'hold']),
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

export default PersonDetail
