import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { PaginationProps } from "../types/post"
import { ChevronsLeft, ChevronsRight } from "lucide-react"

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      <Button variant="ghost" size="round" disabled={currentPage <= 1} asChild>
        <Link href={currentPage > 2 ? `${baseUrl}?page=${currentPage - 1}` : baseUrl}><ChevronsLeft /></Link>
      </Button>

      <div className="flex items-center text-sm text-zinc-400">
        {currentPage} / {totalPages}
      </div>

      <Button variant="ghost" size="round" disabled={currentPage >= totalPages} asChild>
        <Link href={`${baseUrl}?page=${currentPage + 1}`}><ChevronsRight /></Link>
      </Button>
    </div>
  )
}

