// pages/Home.js (updated with modern design)
import { Card } from "../components"
import { useFetchPaje, useTitle } from "../hooks/";
import { useState } from "react";

const Home = ({pathToApi, title}) => {
  useTitle(title)
  const [loading, setLoading]= useState(false)
  console.log("fetching Movie Data...")
  const {norm: movies} = useFetchPaje(pathToApi, loading, setLoading)
  
  return (
    <main>
      <section className="py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to <span className="text-[#F54927]">Kweka Movie</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover, explore, and enjoy the world of cinema. Find your next favorite movie from our curated collections.
          </p>
        </div>

        {/* Loading State */}
        <div className={loading ? "flex flex-col items-center justify-center py-20" : "hidden"}>
          <div className="w-16 h-16 border-4 border-[#F54927] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading movies...</p>
        </div>

        {/* Movies Grid */}
        <div className={loading ? "hidden" : ""}>
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <Card key={movie.id} movie={movie}/>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No movies found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try checking back later for new releases.</p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  ) 
}

export default Home