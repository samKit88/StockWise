import axios, { AxiosError, AxiosResponse } from 'axios'
import { PartnerFormType } from '../../schema/partnerSchema'
import { PartnerResponsType } from '../../types/Partner.types'

export const fetchPartners = async (): Promise<PartnerResponsType[]> => {
  const response = await axios.get<PartnerResponsType[]>(
    'http://localhost:3000/partner'
  )
  return response.data
}

export const createPartner = async (
  data: PartnerFormType
): Promise<PartnerFormType> => {
  const response = await axios.post('http://localhost:3000/partner', data)
  // console.log(response.data)
  return response.data
}

export const updatePartner = async (
  data: PartnerFormType | any
): Promise<AxiosError | any> => {
  console.log(`**************** ${data.id} ***************`)
  const response = await axios.patch(
    'http://localhost:3000/partner/' + data.id,
    data
  )
  return response.data
}

export const deletePartner = async (
  data: PartnerFormType | any
): Promise<AxiosError | any> => {
  return await axios.delete('http://localhost:3000/partner/' + data.id, data)
}
