import axios, { AxiosResponse } from 'axios'
import { ShipmentFormData } from '../../schema/shipment.schema'

export const fetchShipment = async (): Promise<AxiosResponse<any>> => {
  return await axios.get('http://localhost:3000/shipment')
}

export const createShipment = async (
  data: ShipmentFormData
): Promise<AxiosResponse<any>> => {
  const response = await axios.post('http://localhost:3000/shipment', data)
  return response
}
