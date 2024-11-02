import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  createInventory,
  deleteInventory,
  fetchInventorys,
  updateInventory,
} from '../api/inventoryApi'

export const createInventoryMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void
) => {
  return useMutation({ mutationFn: createInventory, onError, onSuccess })
}

export const fetchInventorysQuery = (queryKey: string[]) => {
  return useQuery({ queryKey, queryFn: fetchInventorys })
}

export const updateInventoryMutation = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({ mutationFn: updateInventory, onError, onSuccess })
}

export const deleteInventoryMutation = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({ mutationFn: deleteInventory, onError, onSuccess })
}
