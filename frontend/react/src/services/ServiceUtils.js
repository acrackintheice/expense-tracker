export const getHeaders = token => ({
  'Content-Type': 'application/json;charset=UTF-8',
  Authorization: 'Bearer ' + token,
  Accept: 'application/json'
})

// This is an assynchronous function because the error
// creation depends on the json body of the response,
// which can only be accessed assunchronously.
export const handleResponse = async response => {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw handleBadRequestError(response)
      default:
        throw Error(response.statusText)
    }
  } else {
    return response
  }
}

const handleBadRequestError = response => {
  try {
    return response.json()
  } catch {
    return Error(response.statusText)
  }
}
