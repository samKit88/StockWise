import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { PartnerFormType } from '../../schema/partnerSchema'
import {
  createPartner,
  deletePartner,
  fetchPartners,
  updatePartner,
} from '../api/partnerApi'

export const fetchPartnerQuery = (queryKey: string[]) => {
  return useQuery({ queryKey, queryFn: fetchPartners })
}

export const createPartnerMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void
): UseMutationResult<AxiosError, PartnerFormType> => {
  return useMutation({
    mutationFn: createPartner,
    onSuccess: onSuccess,
    onError: onError,
  })
}

export const updatePartnerMutation = (
  onError: (error: AxiosError | any) => void,
  onSuccess: (data: any) => void
): UseMutationResult<AxiosError, PartnerFormType> => {
  return useMutation({ mutationFn: updatePartner, onError, onSuccess })
}

export const deletePartnerMutation = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({ mutationFn: deletePartner, onError, onSuccess })
}
