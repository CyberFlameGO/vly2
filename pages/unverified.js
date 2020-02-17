import publicPage from '../hocs/publicPage'
import { FullPage } from '../components/VTheme/VTheme'
import { Unverified } from '../components/Warnings/Unverified'

const UnverifiedPage = ({ user }) =>
  <FullPage>
    <Unverified user={user} />
  </FullPage>

export default publicPage(UnverifiedPage)
