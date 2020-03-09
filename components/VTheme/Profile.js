import styled from 'styled-components'

export const VBanner = styled.header`
margin: 5rem 0 0rem 0;
display: grid;
grid-template-columns: 100%;
align-self: center;
justify-self: center;
margin-bottom: 2rem;
@media screen and (min-width: 767px) {
  grid-template-columns: 15rem 1fr;
  gap: 5rem;
 
}


`
export const ProfileBannerTitle = styled.div`

align-self: center;
text-align: center;


@media screen and (min-width: 767px) {

  text-align: left;
}

`

export const VBannerImg = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  align-self: center;
  justify-self: center;
  padding: 2.5rem;
  margin-left: 4rem;

@media screen and (max-width: 767px) {
  margin-left: initial;
  width: 15rem;
  height: 15rem;
 padding: 1rem;


 
}
`

export const ProfileTabs = styled.nav`
  text-align: left;
  display: grid;
  grid-template-columns: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
  width: 100%;

  @media screen and (min-width: 767px) {
    grid-template-columns: 20% 80%;
  }
`

export const ProfileTab = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #6549AA;
`

export const ProfilePanel = styled.article`
  text-align: left;
  margin: 2rem 0;
`

export const ProfileSection = styled.section`
  margin: 1.5rem 0 0 0;

`
export const ProfileSectionTitle = styled.h2`
  margin: 1.5rem 0 ;

  small {
    display: block;
    line-height: 2rem;
    font-size: 50%;
  }
`
