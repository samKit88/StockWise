import { Table } from '@mantine/core'
import TableRow from './ui/TableRow'

const headerData = [
  {
    id: 1,
    name: 'Name',
    code: 'Code',
    category: 'Category',
    brand: 'Brand',
    buyingPrice: 'Buying Price',
    sellingPrice: 'Selling Price',
    productUnit: 'Product Unit',
    quantity: 'Quantity',
    taxType: 'Tax Type',
    description: 'Description',
    productType: 'Product Type',
    action: 'Action',
  },
]

const header = headerData.map((row) => (
  <Table.Tr key={row.id}>
    <Table.Th>{row.name}</Table.Th>
    <Table.Th>{row.code}</Table.Th>
    <Table.Th>{row.category}</Table.Th>
    <Table.Th>{row.brand}</Table.Th>
    <Table.Th>{row.buyingPrice}</Table.Th>
    <Table.Th>{row.sellingPrice}</Table.Th>
    <Table.Th>{row.productUnit}</Table.Th>
    <Table.Th>{row.quantity}</Table.Th>
    <Table.Th>{row.taxType}</Table.Th>
    <Table.Th>{row.description}</Table.Th>
    <Table.Th>{row.productType}</Table.Th>
    <Table.Th>{row.action}</Table.Th>
  </Table.Tr>
))

const ProductTable = ({ inventory, onView, onEdit, onDelete }) => {
  return (
    <Table highlightOnHover verticalSpacing="lg" horizontalSpacing="sm">
      <Table.Thead className="bg-gray-50 text-xs text-gray-600 font-serif">
        {header}
      </Table.Thead>
      <Table.Tbody className="text-gray-600 text-xs">
        <TableRow
          inventory={inventory}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Table.Tbody>
    </Table>
  )
}

export default ProductTable
