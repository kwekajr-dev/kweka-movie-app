// App.js (updated)
import './App.css';
import { Footer, Header } from './components';
import AllRoutes from './routes/AllRoutes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App dark:bg-gray-900 bg-gray-50 min-h-screen">
      <Header/>
      <AllRoutes/>
      <ScrollToTop smooth />
      <Footer/>
    </div>
  );
}

export default App;