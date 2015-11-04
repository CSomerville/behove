// convenience method to throw error on bad fetch status

export default function checkStatus(response) {
  console.log('in here')
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
