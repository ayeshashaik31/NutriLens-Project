import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <Link to="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          </Link>
        </div>     
    </nav>
  )
}

export default Navbar
