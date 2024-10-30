import { useEffect, useState } from 'react'
import {
  Autocomplete,
  Button,
  Card,
  NativeSelect,
  NumberInput,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { PartnerFormType } from '../../schema/partnerSchema'

const PartnerForm = ({ form, onSave, isLoading, type, fields }) => {
  const handleSubmit = (values: PartnerFormType) => {
    console.log(values)
    onSave(values)
  }

  useEffect(() => {
    console.log(form.errors)
  }, [form.errors])

  return (
    <>
      <Card className="mb-4">
        <form
          className=" px-3 py-2 border border-gray-150 rounded-lg "
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <div className="flex flex-wrap gap-6 ">
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

            <NativeSelect
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
          </div>
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
        </form>
      </Card>
    </>
  )
}

export default PartnerForm
