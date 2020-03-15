import * as ServiceUtils from './ServiceUtils'
import * as GoogleService from './GoogleService'

const url = 'http://localhost:8080/users'

const getUserByGoogleId = async () => {
  const googleInfo = await GoogleService.getGoogleInfo()
}
