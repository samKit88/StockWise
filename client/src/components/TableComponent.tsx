import {
  Card,
  Pagination,
  Table,
  TableTbody,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core'
import TableRow from './ui/TableRow'
import { useState } from 'react'

export interface Column<T> {
  heading: string
  value?: string
  render?: (item: T) => JSX.Element
}

interface TableProp<T> {
  data: T[]
  column: Column<T>[]
  isLoading?: boolean
}

const TableComponent = <T,>({ data, column, isLoading }: TableProp<T>) => {
  const recordsPerPage = 10
  const [activePage, setPage] = useState(1)
  const startIndex = (activePage - 1) * recordsPerPage
  return (
    <>
      <Card shadow="xl" padding="" radius="lg" withBorder>
        {isLoading ? (
          <h1>loading</h1>
        ) : (
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
        )}
        <Pagination
          className="flex justify-center my-4"
          total={Math.ceil(data?.length ?? 0 / recordsPerPage)}
          value={activePage}
          onChange={setPage}
        />
      </Card>
    </>
  )
}

const TableHeadItem = ({ item }) => <TableTh>{item.heading}</TableTh>
export default TableComponent
