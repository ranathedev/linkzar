import { User } from 'firebase/auth'

export interface LinkType {
  _id: string
  shortId: string
  originalURL: string
  createdDate: string
  clickCounts: number
}

export interface PageProps {
  user: User
  isLoading: boolean
  theme: string
}
