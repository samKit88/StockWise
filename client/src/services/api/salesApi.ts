import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { SalesFormData } from '../../schema/salesSchema'

export const fetchSales = async () => {
  return await axios.get('http://localhost:3000/sales')
}

export const fetchSalesById = async (id: string): Promise<AxiosError | any> => {
  // console.log('The data accepted by api', id)
  return axios.get('http://localhost:3000/sales/' + id)
}

export const createSales = async (
  data: SalesFormData
): Promise<AxiosResponse<any>> => {
  const response = await axios.post('http://localhost:3000/sales', data)
  return response
}
