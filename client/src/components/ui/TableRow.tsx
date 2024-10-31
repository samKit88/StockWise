import { TableTd, TableTr } from '@mantine/core'

const TableRow = ({ item, column }) => {
  return (
    <>
      <TableTr>
        {(column || []).map((columnItem, index) => {
          if (columnItem.render) {
            return <TableTd key={index}>{columnItem.render(item)}</TableTd>
          }
          if (columnItem.value.includes('.')) {
            const itemSplit = columnItem.value.split('.')
            return (
              <TableTd key={index}>
                {item[itemSplit[0]][itemSplit[1]][itemSplit[2]]}
              </TableTd>
            )
          }

          return <TableTd>{item[`${columnItem.value}`]}</TableTd>
        })}
      </TableTr>
    </>
  )
}

export default TableRow
