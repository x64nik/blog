// components/Navbar.tsx
import Link from "next/link"
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa" // Using react-icons for the logos

export default function Navbar() {
  return (
    <header className="top-0 left-0 w-full bg-transparent z-10">
      <div className="max-w-4xl mx-auto py-12 w-full flex items-center justify-between">
        {/* Site name */}
        <h1 className="text-xl font-bold text-zinc-100 hover:text-zinc-300 transition-colors">
          <Link href="/">~/.rushikesh.de</Link>
        </h1>
        {/* Social links */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link
                href="https://github.com/your-username"
                target="_blank"
                className="text-zinc-400 hover:text-zinc-300 transition-colors text-xl"
              >
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                className="text-zinc-400 hover:text-zinc-300 transition-colors text-xl"
              >
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/your-profile"
                target="_blank"
                className="text-zinc-400 hover:text-zinc-300 transition-colors text-xl"
              >
                <FaTwitter />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
