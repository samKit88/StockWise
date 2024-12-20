import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { createSales, fetchSales } from '../api/salesApi'

export const fetchPurchaseQuery = (queryKey: string[]) => {
  return useQuery({ queryKey, queryFn: fetchSales })
}

export const createPurchaseMutation = (
  onError?: (error: AxiosError) => void,
  onSuccess?: (data: any) => void
) => {
  return useMutation({ mutationFn: createSales, onError, onSuccess })
}
