import * as ServiceUtils from './ServiceUtils'

const url = 'http://api.acrackintheice.com/tags'

export const getAll = async accessToken => {
  const response = await fetch(url, {
    method: 'GET',
    headers: ServiceUtils.getHeaders(accessToken)
  })
  return ServiceUtils.handleResponse(response)
}
