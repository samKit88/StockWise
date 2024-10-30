import { Table, TableTbody, TableTh, TableThead, TableTr } from '@mantine/core'
import TableRow from './ui/TableRow'

type NestedKeyOf<ObjectType> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Record<
    string,
    any
  > // Check if the property is an object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}` | Key // Nested keys with current key
    : Key // Direct key if not an object
}[keyof ObjectType & (string | number)] // Restrict to valid types

export type Column<T> = {
  heading: string
  value?: NestedKeyOf<T>
  render?: (item: T) => JSX.Element
}

interface ProductTableProp<T> {
  data: T[]
  column: Column<T>[]
}

const ProductTable = <T,>({ data, column }: ProductTableProp<T>) => {
  console.log('data from the table', data)
  return (
    <Table
      className="bg-gray-50 text-xs"
      highlightOnHover
      verticalSpacing="lg"
      horizontalSpacing="sm"
    >
      <TableThead className=" text-gray-600 font-serif">
        <TableTr>
          {column.map((item, index) => (
            <TableHeadItem item={item} />
          ))}
        </TableTr>
      </TableThead>
      <TableTbody className="text-gray-600 text-xs ">
        {data?.map((item, index) => (
          <TableRow item={item} column={column} />
        ))}
      </TableTbody>
    </Table>
  )
}

const TableHeadItem = ({ item }) => <TableTh>{item.heading}</TableTh>
export default ProductTable
