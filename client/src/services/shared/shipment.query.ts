import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createShipment, fetchShipment } from '../api/shipmentApi'

export const fetchShipmentQuery = (queryKey: string[]) => {
  return useQuery({ queryKey, queryFn: fetchShipment })
}

export const createShipmentMutation = (
  onError?: (error: AxiosError) => void,
  onSuccess?: (data: any) => void
) => {
  return useMutation({ mutationFn: createShipment, onError, onSuccess })
}
