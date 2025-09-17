import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card } from '../components';
import { useFetchPaje } from '../hooks';

const Dashboard = () => {
  const { user } = useUser();
  const [stats, setStats] = useState({
    moviesBrowsed: 42,
    watchlistCount: 8,
    favoriteGenre: 'Action'
  });

  useEffect(() => {
  // Simulate user-specific data based on their ID
  if (user) {
    // This would typically come from your backend
    const userStats = {
      moviesBrowsed: Math.floor(Math.random() * 100) + 1,
      watchlistCount: Math.floor(Math.random() * 20) + 1,
      favoriteGenre: ['Action', 'Comedy', 'Drama', 'Thriller', 'Sci-Fi'][Math.floor(Math.random() * 5)]
    };
    setStats(userStats);
  }
}, [user]);
  
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('release_date');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { norm: movies } = useFetchPaje('movie/now_playing?', false, () => {});
  const { norm: recommendedMovies } = useFetchPaje('movie/popular?', false, () => {});
  
  // Filter and sort movies based on user selections
  const filteredMovies = movies
    ?.filter(movie => 
      (selectedGenre ? movie.genre_ids?.includes(parseInt(selectedGenre)) : true) &&
      (selectedYear ? movie.release_date?.startsWith(selectedYear) : true) &&
      (selectedRating ? movie.vote_average >= parseInt(selectedRating) : true) &&
      (searchTerm ? movie.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    )
    .sort((a, b) => {
      if (sortBy === 'release_date') return new Date(b.release_date) - new Date(a.release_date);
      if (sortBy === 'vote_average') return b.vote_average - a.vote_average;
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      return 0;
    }) || [];

  // Pagination
  const moviesPerPage = 8;
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  // Latest movies for the table
  const latestMovies = movies?.slice(0, 5) || [];

  // Genre options (you might want to fetch these from an API)
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  const yearOptions = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your movie experience.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Movies Browsed</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.moviesBrowsed}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Watchlist</h3>
            <p className="text-3xl font-bold text-green-600">{stats.watchlistCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favorite Genre</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.favoriteGenre}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Latest Movies Table */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Latest Movies</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {latestMovies.map((movie) => (
                  <div key={movie.id} className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}` : '/placeholder-poster.png'} 
                        alt={movie.title}
                        className="w-12 h-18 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{movie.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                            {movie.vote_average?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                <button className="w-full text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                  View More Movies
                </button>
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended For You</h3>
              </div>
              <div className="p-4">
                {recommendedMovies?.slice(0, 3).map((movie) => (
                  <div key={movie.id} className="mb-4 last:mb-0">
                    <div className="flex">
                      <img 
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}` : '/placeholder-poster.png'} 
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{movie.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                            {movie.vote_average?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Movie Browser */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Movie Browser</h3>
                
                {/* Filters and Search */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genre</label>
                    <select 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                      <option value="">All Genres</option>
                      {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                    <select 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="">All Years</option>
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Rating</label>
                    <select 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                    >
                      <option value="">Any Rating</option>
                      <option value="7">7+</option>
                      <option value="8">8+</option>
                      <option value="9">9+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                    <select 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="release_date">Release Date</option>
                      <option value="vote_average">Rating</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Movie Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentMovies.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                  ))}
                </div>
                
                {/* No results message */}
                {currentMovies.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No movies found matching your criteria.</p>
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded border ${
                              currentPage === page
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;