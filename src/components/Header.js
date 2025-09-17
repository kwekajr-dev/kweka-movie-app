import { Link, NavLink, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.jpeg'
import { useEffect, useState } from "react"
import './Header.css'
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react'

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [mounted, setMounted] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault()
    const from = e.target.search.value;
    e.target.reset()
    return navigate(`/search?q=${from}`);
  }

  const [hidden, setHidden] = useState(true)
  const [darkMod, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false)
  
  useEffect(() => {
    setMounted(true);
    localStorage.setItem("darkMode", JSON.stringify(darkMod))
    if(darkMod){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark")
    }
  },[darkMod])

  const ActiveClass = "text-base block py-2 px-3 text-white bg-[#F54927] rounded-md md:bg-transparent md:text-[#F54927] md:p-0"
  const InAciveClass = "text-base block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F54927] md:p-0 dark:text-gray-300 md:dark:hover:text-[#F54927] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"

  const handleSignOut = () => {
    signOut();
    navigate('/');
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} className="h-10 w-10 rounded-full" alt="Kweka Movie Logo" />
            <span className="text-xl font-bold text-[#F54927]">Kweka Movie</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/home" className={({isActive}) => isActive ? ActiveClass : InAciveClass} end>Home</NavLink>
            <NavLink to="/movies/top" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Top Rated</NavLink>
            <NavLink to="/movies/upcoming" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Upcoming</NavLink>
            <NavLink to="/movies/popular" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Popular</NavLink>
            <SignedIn>
              <NavLink to="/dashboard" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Dashboard</NavLink>
            </SignedIn>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMod)} 
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#F54927]"
              aria-label="Toggle dark mode"
            >
              {darkMod ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search movies..." 
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F54927] focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  autoComplete="off" 
                  name="search"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>
            </div>

            {/* Authentication */}
            <SignedIn>
              <div className="flex items-center space-x-3">
                <UserButton afterSignOutUrl="/" />
                {user && (
                  <div className="hidden md:flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Hi, {user.firstName}
                    </span>
                    <div className="border-l border-gray-300 dark:border-gray-600 h-6"></div>
                    <button 
                      onClick={handleSignOut}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#F54927]"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="hidden md:flex space-x-2">
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            </SignedOut>

            {/* Mobile menu button */}
            <button 
              onClick={() => setHidden(!hidden)} 
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#F54927]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${hidden ? 'hidden' : 'block'} md:hidden pb-4`}>
          <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSearch} className="px-2 mb-4">
              <input 
                type="text" 
                placeholder="Search movies..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F54927] focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                autoComplete="off" 
                name="search"
              />
            </form>
            
            <div className="flex flex-col space-y-2">
              <NavLink to="/home" className={({isActive}) => isActive ? ActiveClass : InAciveClass} end>Home</NavLink>
              <NavLink to="/movies/top" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Top Rated</NavLink>
              <NavLink to="/movies/upcoming" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Upcoming</NavLink>
              <NavLink to="/movies/popular" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Popular</NavLink>
              <SignedIn>
                <NavLink to="/dashboard" className={({isActive}) => isActive ? ActiveClass : InAciveClass}>Dashboard</NavLink>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center px-2 py-3">
                    <img 
                      src={user?.imageUrl} 
                      alt={user?.fullName} 
                      className="h-8 w-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              </SignedIn>
              
              <SignedOut>
                <div className="flex space-x-2 pt-2">
                  <Link to="/login" className="flex-1 text-center btn-secondary">
                    Login
                  </Link>
                  <Link to="/signup" className="flex-1 text-center btn-primary">
                    Sign Up
                  </Link>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header