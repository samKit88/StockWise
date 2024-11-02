import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { SalesFormData } from '../../schema/salesSchema'

export const fetchSales = async (): Promise<AxiosResponse<any>> => {
  return await axios.get('http://localhost:3000/sales')
}

export const createSales = async (
  data: SalesFormData
): Promise<AxiosResponse<any>> => {
  const response = await axios.post('http://localhost:3000/sales', data)
  return response
}
