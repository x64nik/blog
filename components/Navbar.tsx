// components/Navbar.tsx
"use client"

import Link from "next/link"
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"
export default function Navbar() {
  return (
    <header className="top-0 left-0 w-full z-10">
      <div className="max-w-4xl mx-auto py-12 w-full flex items-center justify-between">
        {/* Site name */}
        <h1 className="text-2xl font-bold text-foreground hover:text-muted-foreground transition-colors">
          <Link href="/">~/ Rushi Darunte</Link>
        </h1>
        {/* Social links */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link
                href="https://github.com/x64nik"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors text-xl"
              >
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/rushikesh-darunte-758565226/"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors text-xl"
              >
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com/x64Rushi"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors text-xl"
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
