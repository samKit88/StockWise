import { MdLabel } from 'react-icons/md'

export const signInConfig = {
  fields: [
    { label: 'Email', name: 'email', type: 'text' },
    { label: 'Password', name: 'password', type: 'password' },
  ],
}

export const signUpConfig = {
  fields: [
    { label: 'First Name', name: 'firstName', type: 'text' },
    { label: 'Last Name', name: 'lastName', type: 'text' },
    { label: 'email', name: 'email', type: 'text' },
    { label: 'Password', name: 'password', type: 'password' },
  ],
}

export const addItemConfig = {
  fields: [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Barcode', name: 'barcode', type: 'text' },
    {
      label: 'Category',
      name: 'category',
      type: 'autocomplete',
      options: ['Electronics', 'Apparel', 'Grocery'],
    },
    {
      label: 'Brand',
      name: 'brand',
      type: 'autocomplete',
      options: ['Electronics', 'Apparel', 'Grocery'],
    },
    { label: 'Buying Price', name: 'buyingPrice', type: 'text' },
    {
      label: 'Tax Type',
      name: 'taxType',
      type: 'select',
      options: ['taxable', 'nonTaxable'],
    },
    { label: 'Quantity', name: 'quantity', type: 'number' },
    {
      label: 'Product Type',
      name: 'productType',
      type: 'select',
      options: ['Sale', 'Use'],
    },

    {
      label: 'Product Unit',
      name: 'productUnit',
      type: 'select',
      options: ['pieces', 'kilograms', 'liters', 'boxes', 'meters'],
    },
    { label: 'Selling Price', name: 'sellingPrice', type: 'text' },

    { label: 'Descriprion', name: 'description', type: 'text' },
  ],
}

export const addPartnerConfig = {
  fields: [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Email', name: 'email', type: 'text' },
    { label: 'Address', name: 'address', type: 'text' },
    {
      label: 'Customer Group',
      name: 'customerGroup',
      type: 'select',
      options: ['Standard', 'Casual', ' Local', 'Foreign'],
    },
    { label: 'Country', name: 'country', type: 'text' },
    { label: 'City', name: 'city', type: 'text' },
    { label: 'Phone Number', name: 'phoneNumber', type: 'number' },

    { label: 'Zip Code', name: 'zipCode', type: 'number' },
  ],
}

export const addSalesConfig = (
  customerOptionFiled = [],
  productOptionfiled = []
) => ({
  fields: [
    { label: 'Order#', name: 'salesNumber', type: 'text' },
    { label: 'Order Date', name: 'orderDate', type: 'date' },
    {
      label: 'Customer',
      name: 'partnerId',
      type: 'select',
      options: customerOptionFiled,
    },
    {
      label: 'Items',
      name: 'items',
      type: 'box',
      boxFileds: [
        { label: 'Quantity', name: 'quantity', type: 'number' },
        { label: 'Unit Price', name: 'unitPrice', type: 'number' },
        {
          label: 'Product',
          name: 'inventoryId',
          type: 'select',
          options: productOptionfiled,
        },
      ],
    },
  ],
})

export interface FormFiled {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'password' | 'date' | 'box'
  options?: { value: string; label: string }[]
  boxFields: {
    label: string
    name: string
    type: string
    options: { value: string; label: string }[]
  }[]
}
