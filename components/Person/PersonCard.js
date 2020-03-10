import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import { Icon } from 'antd'
const ContactIcon = ({ type }) =>
  <Icon
    // theme='twoTone'
    twoToneColor='blue'
    type={type}
    style={{ marginRight: '0.5rem', fontSize: '1rem', color: '#6549AA' }}
  />

const PersonContainer = styled.section`
height: auto;

img {
  max-height: 8rem;
  border-radius: 8px;
}


figcaption {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  margin-bottom: 1rem;


@media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;

  }

  /* box-shadow: 1px 1px 12px 2px rgba(10,10,10,0.2);
  border-radius: 8px; */
}

a {
  align-self: center;
}

a:hover {
  h4, p {
    color: #6549AA;
  }

}
`

const PersonCard = ({ person }) => (
  <PersonContainer>

    <figcaption>

      <img src={person.imgUrl} />

      <Link href={`/people/${person._id}`}>
        <a target='_blank'>
          <h4>{person.name}</h4>
          <p>{person.placeOfWork}</p>
          <p>{person.job}</p>
        </a>
      </Link>
    </figcaption>

    <section>
      <h5>Contact details</h5>
      <p className='personName'><ContactIcon type='mail' />{person.email}</p>

      {person.phone &&

        <p className='personName'><ContactIcon type='phone' />{person.phone}</p>}

    </section>

    <style jsx>{`
      .personName {
     
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis; 
        word-wrap: break-word;
        display: inline;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
    `}
    </style>
  </PersonContainer>
)

PersonCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    job: PropTypes.string,
    placeOfWork: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string.isRequired
  }).isRequired
}

export default PersonCard
