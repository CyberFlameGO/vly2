/*
  Display a pseudo activity card to create a new activity.
*/
import Link from 'next/link'
import { Card, DescriptionWrapper } from '../VTheme/VTheme'
import styled from 'styled-components'

const ImageWrapper = styled.div`
  position: relative;

`

const OpAddCard = () => {
  return (
    <Card>
      <Link href='/op/new'>
        <a>
          <ImageWrapper>
            <img src='/static/img/opportunity/actCreate.png' alt='create a new activity' />
          </ImageWrapper>

          <figcaption>
            <h1>
              Create Activity
            </h1>

            <DescriptionWrapper>
              This will create an opportunity that volunteers can sign up for 🥳
            </DescriptionWrapper>
          </figcaption>
        </a>
      </Link>
    </Card>
  )
}

export default OpAddCard
