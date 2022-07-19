import axios from "axios";

// Simple GET request using axios to get response
export function login(endPoint, body) {
  return axios.post(endPoint, body)
}


// get user Infos
export function getUserInfos(endPoint, body, token) {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  return axios.post(endPoint, body, headers )
}