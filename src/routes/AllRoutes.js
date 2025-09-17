import { Route, Routes } from 'react-router-dom'
import { DownloadMovie, Home, MovieDetails, PageNotFound, Search, Login, Signup, Dashboard, Settings, VerifyEmail } from '../pages'
import AuthRedirect from '../components/AuthRedirect'

const AllRoutes = () => {
  return (
    <>
        <Routes>
            {/* Redirect based on authentication status */}
            <Route path="" element={<AuthRedirect />} />
            
            <Route path="home" element={<Home pathToApi="movie/now_playing?" title="Home"/>}/>
            <Route path="movies/upcoming" element={<Home pathToApi="movie/upcoming?" title="Upcoming"/>}/>
            <Route path="movies/top" element={<Home pathToApi="movie/top_rated?" title="Top Rated"/>}/>
            <Route path="movies/popular" element={<Home pathToApi="movie/popular?" title="Popular"/>}/>
            <Route path="movie/:id" element={<MovieDetails/>}/>
            <Route path="search/" element={<Search pathToApi={"search/movie?query="}/>}/>
            <Route path="download/:id" element={<DownloadMovie/>}/>
            
            {/* Auth Routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/verify-email-address" element={<VerifyEmail />} />
            
            {/* Protected Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            
            <Route path="*" element={<PageNotFound title="Page Not Found"/>}/>
        </Routes>
    </>
  )
}

export default AllRoutes