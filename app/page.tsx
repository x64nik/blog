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
