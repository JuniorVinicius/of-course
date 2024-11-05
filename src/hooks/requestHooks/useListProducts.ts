import { api } from '@/services/api'
import { Data } from '@/utils/types/TableTypes'
import { useQuery } from '@tanstack/react-query'

type GetDataResponse = {
  total: number
  items: Data[]
}

type GetDataProps = {
  page?: number
  limit?: number
  enabled?: boolean
  sortBy?: string
  order?: 'asc' | 'desc'
}

export async function getData({
  page,
  limit,
  sortBy,
  order,
}: GetDataProps): Promise<GetDataResponse> {
  const response = await api.get('/products', {
    params: {
      skip: page,
      limit,
      sortBy,
      order,
    },
  })

  return {
    total: response.data.total,
    items: response.data?.products,
  }
}

export function useListProducts({
  page,
  limit,
  enabled,
  sortBy,
  order,
}: GetDataProps) {
  return useQuery({
    queryKey: ['products', page, limit, enabled, sortBy, order],
    queryFn: () => getData({ page, limit, sortBy, order }),
    enabled,
  })
}
