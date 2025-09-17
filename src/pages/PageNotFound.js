// pages/PageNotFound.js (updated with logo)
import { Link } from 'react-router-dom'
import { useTitle } from '../hooks'
import Logo from '../assets/logo.jpeg'

const PageNotFound = ({title}) => {
  useTitle(title)
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md mx-auto">
        <img 
          src={Logo} 
          alt="Kweka Movie Logo" 
          className="h-24 w-24 mx-auto mb-6 rounded-full"
        />
        <h1 className="text-6xl font-bold text-[#F54927] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center btn-primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  )
}

export default PageNotFound