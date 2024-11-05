import axios, { AxiosError } from 'axios'
import { redirect } from 'next/navigation'

export function setupApiClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  return api
}
