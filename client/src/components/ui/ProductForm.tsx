import { useState } from 'react'
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

const ProductForm = ({ form, onSave, isLoading, type, fields }) => {
  const [value, setValue] = useState<Date | null>(null)

  const handleSubmit = (data) => {
    onSave(data)
  }

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

export default ProductForm
