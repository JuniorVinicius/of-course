'use client'
import { Data, HeadCell, Order } from '@/utils/types/TableTypes'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import TableHeader from './TableHeader'
import { formatCurrencyToBRL } from '@/utils/functionns/formatCurrency'
import { formatDateToBrazilian } from '@/utils/functionns/formatDates'

type TableProductsProps = {
  rows: Data[]
  headCells: readonly HeadCell[]
  emptyRows: number
  visibleRows: Data[]
  order: Order | undefined
  orderBy: keyof Data
  selected?: number
  page: number
  rowsPerPage: number
  totalRows: number
  onRowClick: (event: React.MouseEvent<unknown>, id: number) => void
  getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TableProducts({
  onRowClick,
  handleRequestSort,
  handleChangePage,
  handleChangeRowsPerPage,
  headCells,
  rows,
  emptyRows,
  visibleRows,
  rowsPerPage,
  order,
  orderBy,
  selected,
  totalRows,
  page,
}: TableProductsProps) {
  return (
    <Box sx={{ width: '100%', maxHeight: '100px' }}>
      <Paper sx={{ width: '100%', maxWidth: '1440px', mb: 2, padding: 1 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected === row.id
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={(event) => onRowClick(event, row.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.brand}</TableCell>
                    <TableCell align="left">{row.stock}</TableCell>
                    <TableCell align="left">
                      {formatCurrencyToBRL(row.price)}
                    </TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.rating}</TableCell>
                    <TableCell align="left">
                      {formatDateToBrazilian(row.meta.createdAt)}
                    </TableCell>
                    <TableCell align="left">
                      {formatDateToBrazilian(row.meta.updatedAt)}
                    </TableCell>
                    <TableCell align="left">x</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25, 30]}
          component="div"
          labelRowsPerPage="Itens por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} de ${count}`
          }
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
