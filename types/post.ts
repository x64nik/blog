export interface Post {
    title: string
    date: string
    updatedDate?: string
    slug: string
    content: string
  }
  
  export interface PostMetadata {
    title: string
    date: string
    slug: string
  }
  
  export interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
  }  