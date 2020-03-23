import { Button } from 'antd'
// import Router from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { HalfGrid } from '../VTheme/VTheme'
import { FormattedMessage } from 'react-intl'
import { SignUpButton } from './SignUp'

// const Search = Input.Search

// this is the big container block that holds the container together lol
const AwesomeHeroContainer = styled.div`
  margin: 0 auto;
  height: auto;
  width: 100%;

  @media screen and (min-width: 768px) {
    margin-top: 8rem;
    p {
    font-size: 1rem;
  }
  }

  @media screen and (min-width: 1200px) {
    width: 80rem;
  }

  p {
    font-size: 1.5rem;
  }
`
// start left hand video side
const HeroLeft = styled.div`
  margin-top: 0rem;
  margin-left: 0rem;
  width: 35rem;
  height: 35rem;
  border-radius: 0;
  @media screen and (min-width: 1026px) and (max-width: 1281px) {
    width: 100%;
    height: auto;
  }

  @media screen and (min-width: 768px) and (max-width: 1025px) {
    width: 100%;

    height: auto;
  }

  @media screen and (max-width: 768px) {
    position: relative;
    height: 20rem;
    width: 100vw;
    overflow: hidden;
  }
`

const AwesomeImage = styled.img`
  position: relative;
  text-align: center;
  margin: 0 auto;

  overflow: hidden;
  object-fit: cover;
  background-color: white;

  @media screen and (min-width: 1026px) and (max-width: 1281px) {
    width: inherit;

  }
  @media screen and (min-width: 768px) and (max-width: 1025px) {
    width: inherit;

  }

  @media screen and (max-width: 768px) {
    height: 20rem;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }
`
// end left hand video side

// start right hand copy + search + button side

const HeroRight = styled.div`
  color: #ffffff;
  display: grid;
  align-self: center;

  @media screen and (max-width: 768px) {
    margin: 1rem 1rem 0 1rem;
  }
`

const HeroText = styled.h1`
font-weight: 700;
font-size: 3.5rem;
letter-spacing: -1.2px;
line-height: 1.4;

@media screen and (min-width: 1026px) and (max-width: 1281px) {
  font-size:2.5rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1025px) {
    font-size:2.5rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;

  }
`

// const SearchBox = styled.div`
// width: 80%;
//   background-color: white;
//   height: 4rem;
//   margin: 1.5rem 0;
//   border-radius: 0.25rem;
//   padding: 8px;
//   box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.5);
//   @media screen and (min-width: 1026px) and (max-width: 1281px) {
//   width: initial;
//   }
//   @media screen and (min-width: 768px) and (max-width: 1025px) {
//     width: initial;
//   }
//   .ant-input-affix-wrapper .ant-input:not(:first-child) {
//     padding-left: 40px;
//   }
//   @media screen and (max-width: 768px) {
//    display: none;
//   }
// `

const HeroAuthenticate = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  align-items: center;

  .hero-authenticate__middle {
    margin-left: 20px;
    margin-right: 20px;
  }
`

// end right hand copy and CTA side

// const handleSearch = search => {
//   Router.push({
//     pathname: '/search',
//     query: {
//       search
//     }
//   })
// }

// begin actual component
const Hero = ({ isAuthenticated }) => (
  <AwesomeHeroContainer>
    <HalfGrid>

      <HeroLeft>

        <AwesomeImage
          src='/static/img/hero2.png'
          alt={<FormattedMessage id='heroImgText' defaultMessage='Children Playing with Robots' description='Description for the hero image' />}
        />

      </HeroLeft>

      <HeroRight>
        <HeroText>People helping people.</HeroText>
        <p>
          We connect people who can volunteer time, advice, or stuff to those who need it.<br /><br />
        </p>
        {/* <SearchBox>
          <Search
            placeholder="Try 'remote learning'"
            prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)' }} />}
            enterButton='Search'
            size='large'
            // eslint-disable-next-line no-console
            onSearch={handleSearch}
            aria-label='Search for volunteering opportunties here'
          />
        </SearchBox> */}
        <div>
          <Button type='secondary' shape='round' size='large' href='https://blog.voluntarily.nz'>
            Learn more
          </Button>
        </div>
        {!isAuthenticated &&
          <HeroAuthenticate>
            <Button type='primary' href='/home' shape='round' size='large'>Log In</Button>
            <div className='hero-authenticate__middle'>or</div>
            <SignUpButton />
          </HeroAuthenticate>}
      </HeroRight>

    </HalfGrid>
  </AwesomeHeroContainer>
)
// LAUNCH IT. WOOOSH!
export default Hero
