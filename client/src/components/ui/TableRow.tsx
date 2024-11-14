import { TableTd, TableTr } from '@mantine/core'
import { object } from 'zod'

const TableRow = ({ item, column }) => {
  // console.log('data from row table ', {object.value.map(())})

  return (
    <>
      <TableTr>
        {(column || []).map((columnItem, index) => {
          if (columnItem.render) {
            return <TableTd key={index}>{columnItem.render(item)}</TableTd>
          }
          if (columnItem.value.includes([])) {
            const itemSplit = columnItem.value.split({})

            return (
              // {}
              <TableTd key={index}>{item[itemSplit[0]]}</TableTd>
              // <TableTd></TableTd>
            )
          }
          // if (columnItem.value.includes([])) {
          //   const
          // }

          return <TableTd>{item[`${columnItem.value}`]}</TableTd>
        })}
      </TableTr>
    </>
  )
}

export default TableRow
