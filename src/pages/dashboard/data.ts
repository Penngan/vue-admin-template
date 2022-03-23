export interface GrowCardItem {
  icon: string
  title: string
  value: number
  total: number
  color: string
  action: string
}

export const growCardList: GrowCardItem[] = [
  {
    title: '访问数',
    icon: 'dashboard-filled',
    value: 2000,
    total: 120000,
    color: '#41c9c6',
    action: '月',
  },
  {
    title: '成交额',
    icon: 'account-book-filled',
    value: 20000,
    total: 500000,
    color: '#36a3f7',
    action: '月',
  },
  {
    title: '下载数',
    icon: 'thunderbolt-filled',
    value: 8000,
    total: 120000,
    color: '#f4516c',
    action: '周',
  },
  {
    title: '成交数',
    icon: 'pie-chart-filled',
    value: 5000,
    total: 50000,
    color: '#33bfa3',
    action: '年',
  },
]
