import About from "@/components/About"
import Projects from "@/components/Projects"

export default async function BlogPage() {

  return (
    <div className="flex flex-col">
      <About/>
      <Projects/>
      
    </div>
  )
}
