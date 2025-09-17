// components/Card.js (completely redesigned)
import { Link } from "react-router-dom"
import Sample from '../assets/logo.jpeg'

const Card = ({movie}) => {
    const { original_title, id, overview, poster_path, vote_average, release_date } = movie

    const disp = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Sample;
    
    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

  return (
    <div className="card group">
      <Link to={`/movie/${id}`} className="block overflow-hidden">
        <img 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
          src={disp} 
          alt={original_title} 
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/movie/${id}`}>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 hover:text-[#F54927] transition-colors">
              {original_title}
            </h3>
          </Link>
          <div className="flex items-center bg-[#F54927] text-white text-xs font-semibold px-2 py-1 rounded-full ml-2 flex-shrink-0">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {vote_average?.toFixed(1)}
          </div>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {formatDate(release_date)}
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {overview}
        </p>
        
        <Link 
          to={`/movie/${id}`} 
          className="inline-flex items-center text-[#F54927] font-medium text-sm hover:underline"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
export default Card