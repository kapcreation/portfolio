import './App.scss';
import wave from './assets/wave.png'
import Home from './pages/Home/Home'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import { useContext, useRef } from 'react';
import { ThemeContext } from './context/themeContext';

function App() {
  const { themeRef } = useContext(ThemeContext)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    
    <div ref={themeRef} className="app" style={{ backgroundImage: `url(${wave})` }}>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
