// components/Navbar.tsx
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-transparent z-10">
      <div className="max-w-4xl mx-auto py-4 w-full flex items-center justify-between">
        {/* Site name */}
        <h1 className="text-xl font-bold text-zinc-100 hover:text-zinc-300 transition-colors">
          <Link href="/">Boomsite</Link>
        </h1>
        {/* Navigation links */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/about"
                className="text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
