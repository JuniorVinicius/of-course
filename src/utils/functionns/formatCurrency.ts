export function formatCurrencyToBRL(value?: number): string {
  if (value)
    return value?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  return 'R$ 0,00'
}
