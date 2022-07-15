import axios from "axios";

// Simple GET request using axios
export function login(endPoint, body) {
  return axios.post(endPoint, body)
}

export function getUserFirstName(endPoint, body, token) {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  return axios.post(endPoint, body, headers )
}