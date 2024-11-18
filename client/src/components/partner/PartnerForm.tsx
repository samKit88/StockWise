import { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  GridCol,
  Modal,
  NativeSelect,
  NumberInput,
  Select,
  Text,
  TextInput,
} from '@mantine/core'
import { PartnerFormType } from '../../schema/partnerSchema'
import { useForm } from '@mantine/form'
import { PartnerResponsType } from '../../types/Partner.types'

interface PartnerFormProp {
  opened: boolean
  onClose: () => void
  form: ReturnType<typeof useForm<PartnerFormType>>
  onSave: (value: any) => void
  isLoading?: boolean
  partners: PartnerResponsType[]
}

const PartnerForm = ({
  form,
  onSave,
  isLoading,
  partners,
  onClose,
  opened,
}: PartnerFormProp) => {
  const handleSubmit = (values: PartnerFormType) => {
    console.log(values)
    onSave(values)
  }

  useEffect(() => {
    console.log(form.errors)
  }, [form.errors])

  return (
    <>
      <Grid>
        <Modal.Root opened={opened} onClose={onClose} centered size={'xl'}>
          <Modal.Overlay opacity={0.7} />
          <Modal.Content>
            <Modal.Header className="bg-gray-200 h-3">
              <Modal.Title className="">
                <Text fw={500} size="md">
                  New Partner
                </Text>
              </Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body className="pt-3">
              <form
                className="px-3 py-2 border border-gray-150 rounded-lg"
                onSubmit={form.onSubmit(handleSubmit)}
              >
                <Grid>
                  <GridCol className="flex flex-wrap gap-6">
                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Name"
                      {...form.getInputProps('name')}
                    />
                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Email"
                      {...form.getInputProps('email')}
                    />
                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Address"
                      {...form.getInputProps('Address')}
                    />

                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Customer Group"
                      {...form.getInputProps('customerGroup')}
                      data={['Standard', 'Casual', ' Local', 'Foreign']}
                    />

                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Country"
                      {...form.getInputProps('country')}
                    />

                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="City"
                      {...form.getInputProps('city')}
                    />

                    <NumberInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Phone Number"
                      placeholder="quantity"
                      {...form.getInputProps('phoneNumber')}
                    />

                    <NumberInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Zip Code"
                      placeholder="zipCode"
                      {...form.getInputProps('zipCode')}
                    />
                  </GridCol>
                  <Button
                    type="submit"
                    className="mt-6 mx-auto block"
                    loading={isLoading}
                    loaderProps={{
                      type: 'dots',
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </form>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      </Grid>
    </>
  )
}

export default PartnerForm
