import { useMutation, useQuery } from '@tanstack/react-query'
import { InventoryType } from '../../types/Inventory.types'
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { InventoryFormData } from '../../schema/inventory.schema'
// import { useSelector } from 'react-redux'
// import { RootState } from '../store/store'

// const inventoy = useSelector((state: RootState) => {
//   state.inventoryInfo
// })

export const fetchInventorys = async (): Promise<
  AxiosResponse<InventoryType[]>
> => {
  const responsData = await axios.get<InventoryType[]>(
    'http://localhost:3000/inventory'
  )

  return responsData
}

export const createInventory = async (
  data: InventoryFormData | any
): Promise<AxiosResponse<any>> => {
  // console.log('from create Inve', data)
  return await axios.post<FormData, AxiosResponse<any>>(
    'http://localhost:3000/inventory',
    data
  )
}

export const updateInventory = async (
  data: InventoryFormData | any
): Promise<AxiosResponse<any>> => {
  return await axios.patch<FormData>(
    'http://localhost:3000/inventory/' + data.id,
    data
  )
}

export const deleteInventory = async (
  data: InventoryFormData | any
): Promise<AxiosError | any> => {
  console.log(`id ${data}`)
  return await axios.delete('http://localhost:3000/inventory/' + data.id)
}
