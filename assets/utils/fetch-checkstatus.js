// convenience method to throw error on bad fetch status

export default function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else if (response.status === 401){
    location.href = '/login'
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
