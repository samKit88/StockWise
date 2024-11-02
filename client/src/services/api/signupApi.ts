import axios from 'axios'
import { SignupForm } from '../../schema/SignupSchema'
import { TokenResponse } from '../../types/User.types'

export const signUpUser = async (data: SignupForm): Promise<TokenResponse> => {
  const response = await axios.post('http://localhost:3000/auth/signup', data)
  console.log(response.data)
  return response.data
}
