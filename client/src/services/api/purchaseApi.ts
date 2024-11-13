import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { PurchaseFormData } from '../../schema/purchaseSchema'

export const fetchPurchase = async (): Promise<AxiosResponse<any>> => {
  return await axios.get('http://localhost:3000/purchase')
}

export const createPurchase = async (
  data: PurchaseFormData
): Promise<AxiosResponse<any>> => {
  const response = await axios.post('http://localhost:3000/purchase', data)
  return response
}
