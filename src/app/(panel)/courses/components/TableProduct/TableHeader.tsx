'use client'
import { Data, HeadCell, Order } from '@/utils/types/TableTypes'
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

type TableHeaderProps = {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  order: Order | undefined
  orderBy: string
  rowCount: number
  headCells: readonly HeadCell[]
}
export default function TableHeader(props: TableHeaderProps) {
  const { order, orderBy, headCells, onRequestSort } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key="actions" align="left" padding="normal">
          Ações
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
