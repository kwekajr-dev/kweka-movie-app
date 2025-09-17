import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Sample from '../assets/logo.jpeg';
import { useTitle } from "../hooks";
import { Mybutton } from '../components'

const MovieDetails = () => {
  const [pan, setPan] = useState({});
  const param = useParams();

  // URL for fetching movie details
  const url = `https://api.themoviedb.org/3/movie/${param.id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`;

  // Memoizing options to prevent unnecessary re-renders
 // Empty array means this memoization will only run once when the component mounts
const [butdown, setButdown]=useState({url:"", download:false})
 

  useEffect(() => {
    async function fetchDetails() {
      const response = await fetch(url);
      const data = await response.json();
      setPan(data);
    }
    fetchDetails();
  }, [url]); // Dependencies: re-fetch if URL or options change

  // Fallback image if no poster_path is available
  const disp = pan.poster_path
    ? `https://image.tmdb.org/t/p/w500/${pan.poster_path}`
    : Sample;

  // Setting the page title using the custom hook
  useTitle(pan.title);

  const handleDownload = ()=>{
    console.log(pan)
    const name = pan.title.replaceAll(" ", "-");
    const year = pan.release_date.substring(0,4)
  
    setButdown({url:`https://nkiri.com/${name}-${year}-download-hollywood-movie/`, download:true})
   }

  return (
    <main>
          <section className="flex justify-around flex-wrap py-10">
      <div className="max-w-sm">
        <img className="rounded-lg" src={disp} alt={pan.title} />
      </div>
      <div className="max-w-2xl text-gray-700 text-lg dark:text-white other:p-4">
        <h1 className="text-4xl font-bold my-3 text-center lg:text-left">
          {pan.title}
        </h1>
        <p className="my-4">{pan.overview}</p>

        {pan.genres ? (
          <p className="my-7 flex flex-wrap gap-2">
            {pan.genres.map((genre) => (
              <span
                className="mr-2 border-gray-200 dark:border-gray-600 rounded p-2 border"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </p>
        ) : null}

        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
            {pan.vote_average}
          </p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <span className="text-gray-900 dark:text-white">
            {pan.vote_count} reviews
          </span>
        </div>

        <p className="my-4">
          <span className="mr-2 font-bold">Movie Runtime:</span>
          <span>{pan.runtime} min.</span>
        </p>
        <p className="my-4">
          <span className="mr-2 font-bold">Movie Budget:</span>
          <span>{pan.budget}</span>
        </p>
        <p className="my-4">
          <span className="mr-2 font-bold">Movie Revenue:</span>
          <span>{pan.revenue}</span>
        </p>
        <p className="my-4">
          <span className="mr-2 font-bold">Movie Release Date:</span>
          <span>{pan.release_date}</span>
        </p>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${pan.imdb_id}`}
          className="my-4"
          rel="noreferrer"
        >
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              IMDB
            </span>
            </button>
        </a>
        <a href={butdown.url} target="_blank" rel="noreferrer" >
        <Mybutton handleDownload = {handleDownload}>
          
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  { butdown.download? "Download":"Try Downloading" }
                  </span>
        </Mybutton>
        </a>       
      </div>
    </section>
    </main>
  );
};

export default MovieDetails;
