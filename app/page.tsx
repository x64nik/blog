import { Button } from "@/components/ui/button"
import { Pagination } from "../components/pagination"
import { getPaginatedPosts } from "../utils/mdUtils"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Book } from "lucide-react"
import About from "@/components/About"
import Projects from "@/components/Projects"

export default async function BlogPage() {

  return (
    <div className="bg-zinc-950 text-zinc-100 flex flex-col">
      <About/>
      <Projects/>
    </div>
  )
}
