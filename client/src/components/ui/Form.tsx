import { type UseFormReturnType } from '@mantine/form'

import React, { useState } from 'react'
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Group,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Select,
  Switch,
  Table,
  TableTd,
  TableTh,
  TableTr,
  Text,
  TextInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { addSalesConfig, FormFiled } from '../../types/FormFileds'
import { buildCreateSlice } from '@reduxjs/toolkit'
import { ItmesFormData, SalesFormData } from '../../schema/salesSchema'
import { IoContractSharp } from 'react-icons/io5'

// interface FormValues {
//   salesItems: ItmesFormData
// }

interface FormWithSubmit {
  onSubmit: (data: any) => { () }
  getInputProps: (name: string) => any
  getValues(): () => SalesFormData
  insertListItem(data: any, field: any): () => any
  removeListItem(data: any, index: any): () => any
  key(data: any): () => any
}

interface FormDataProps<T> {
  form: T
  onSave: (values: T) => void
  isLoading: boolean
  type: string
  fields: FormFiled[]
}

const AuthForm = <T extends FormWithSubmit>({
  form,
  onSave,
  isLoading,
  type,
  fields,
}: FormDataProps<T>) => {
  const [boxButtonClicked, setBoxButtonClicked] = useState<number[]>([1])
  const [value, setValue] = useState<Date | null>(null)

  const config = addSalesConfig()
  const handleSubmit = (data) => {
    // console.log(data)
    const values: T = {} as T
    onSave(data) // Call onSave function passed as prop
  }

  const handleBoxButtonClick = () => {
    setBoxButtonClicked((value) => [...value, 1]),
      form.insertListItem('salesItems', fields)
  }

  const handleRemoveItem = () => {
    setBoxButtonClicked((value) =>
      value.length > 1 ? value.slice(0, -1) : value
    )
  }

  const addBoxFileds = boxButtonClicked.map((item, index) => (
    <Group key={item} mt="xs">
      <NativeSelect
        placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`salesItems.${index}.name`)}
        {...form.getInputProps(`salesItmes.${index}.name`)}
      />
      <NumberInput
        placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`salesItems.${index}.name`)}
        {...form.getInputProps(`salesItmes.${index}.name`)}
      />

      <NumberInput
        placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`salesItems.${index}.name`)}
        {...form.getInputProps(`salesItmes.${index}.name`)}
      />
      <ActionIcon color="red" onClick={handleRemoveItem}>
        <IoContractSharp size="1rem" />
      </ActionIcon>
    </Group>
  ))

  return (
    <>
      <Card className="mb-4">
        <form
          className=" px-3 py-2 border border-gray-150 rounded-lg "
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <div className="flex flex-wrap gap-6 ">
            {fields.map((field, index) => (
              <div
                key={field.name}
                className={`${
                  field.type === 'box'
                    ? 'w-full'
                    : 'w-auto flex-1 min-w-[300px] '
                }`}
              >
                {field.type === 'select' ? (
                  <NativeSelect
                    label={field.label}
                    {...form.getInputProps(field.name)}
                    data={field.options}

                    // mt="md"
                  />
                ) : field.type === 'text' ? (
                  <TextInput
                    label={field.label}
                    type={field.type}
                    {...form.getInputProps(field.name)}
                  />
                ) : field.type === 'number' ? (
                  <NumberInput
                    label={field.label}
                    placeholder="quantity"
                    {...form.getInputProps(field.name)}
                  />
                ) : field.type === 'password' ? (
                  <PasswordInput
                    // className="pt-3 flex flex-col gap-6 text-gray-700"
                    label={field.label}
                    placeholder="use strong password"
                    {...form.getInputProps(field.name)}
                    withAsterisk
                  />
                ) : field.type === 'date' ? (
                  <DateInput
                    valueFormat="YYYY/MM/DD"
                    onChange={setValue}
                    label="Date input"
                    placeholder="Date input"
                    {...form.getInputProps(field.name)}
                  />
                ) : field.type === 'box' ? (
                  <>
                    {field.boxFields?.map((boxField, index) => (
                      <Box className="w-full">
                        <>
                          <p>asdfkjaskdfj;kajsd;fkj;aksdjfkjskdfjkjsdkfj</p>
                          {/* {boxButtonClicked.length > 0 ? (
                            <Group mb="xs" className="flex justify-evenly">
                              <Text>{boxField.name}</Text>
                              <Text>{boxField.name}</Text>
                              <Text>{boxField.name}</Text>
                            </Group>
                          ) : (
                            <TextInput
                              placeholder="John Doe"
                              withAsterisk
                              style={{ flex: 5 }}
                              key={form.key(`salesItems.${index}.name`)}
                              {...form.getInputProps(
                                `salesItems.${index}.name`
                              )}
                              {...form.getInputProps(
                                `salesItems.${index}.name`
                              )}
                            />
                          )}

                          {addBoxFileds} */}
                          <Group justify="center" mt="md">
                            <Button onClick={handleBoxButtonClick}>
                              Add Item
                            </Button>
                          </Group>
                        </>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Autocomplete
                    label={field.label}
                    data={field.options || []}
                    {...form.getInputProps(field.name)}
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            type="submit"
            className="mt-6 mx-auto block"
            // loading={isUpdating}
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

export default AuthForm
