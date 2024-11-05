'use client'
import TableProduct from '@/app/(panel)/courses/components/TableProduct'
import { useListProducts } from '@/hooks/requestHooks/useListProducts'
import { Data, HeadCell, Order } from '@/utils/types/TableTypes'
import { Container, Stack, TextField } from '@mui/material'
import { useMemo, useState } from 'react'

const rows: Data[] = []

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}
function getComparator<Key extends keyof any>(
  order: Order | undefined,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Título',
  },
  {
    id: 'brand',
    numeric: false,
    disablePadding: false,
    label: 'Marca',
  },
  {
    id: 'stock',
    numeric: true,
    disablePadding: false,
    label: 'Em Estoque',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Preço',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Categoria',
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Avaliações',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Criação',
  },
  {
    id: 'updatedAt',
    numeric: true,
    disablePadding: false,
    label: 'Atualização',
  },
]

export default function Courses() {
  const [order, setOrder] = useState<Order | undefined>()
  const [orderBy, setOrderBy] = useState<any>('')
  const [selected, setSelected] = useState<number | undefined>()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { data, isLoading, error } = useListProducts({
    page,
    limit: rowsPerPage,
    enabled: true,
    sortBy: orderBy,
    order,
  })
  console.log('🚀 ~ Courses ~ data:', data)

  const onRowClick = (event: React.MouseEvent<unknown>, id: number) => {
    setSelected(id)
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const ROW = data?.items || []

  const visibleRows = useMemo(
    () => [...ROW],
    // .sort(getComparator(order, orderBy))
    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, ROW]
  )

  return (
    <Container
      sx={{
        maxWidth: '100% !important',
        display: 'flex',
        margin: '0px !important',
        padding: '0px !important',
        justifyContent: 'center',
        gap: '30px',
      }}
    >
      <Stack width="100%">
        <Container
          sx={{
            maxWidth: '100% !important',
            display: 'flex',
            margin: '0px !important',
            padding: '0px !important',
            justifyContent: 'right',
            marginBottom: '20px !important',
          }}
        >
          <TextField
            id="standard-basic"
            label="Buscar"
            variant="standard"
            sx={{
              maxWidth: '300px',
            }}
          />
        </Container>
        <TableProduct
          rows={ROW}
          totalRows={data?.total || 0}
          headCells={headCells}
          getComparator={getComparator}
          onRowClick={onRowClick}
          handleRequestSort={handleRequestSort}
          selected={selected}
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          emptyRows={emptyRows}
          visibleRows={visibleRows}
        />
      </Stack>
    </Container>
  )
}
