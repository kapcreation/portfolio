import './App.scss';
import wave from './assets/wave.png'
import Home from './pages/Home/Home'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import { useContext, useRef } from 'react';
import { ThemeContext } from './context/themeContext';
import useAuth from './hooks/useAuth';
import Login from './pages/Login/Login';

function App() {
  const { currentUser } = useAuth()
  const { themeRef } = useContext(ThemeContext)

  const ProtectedRoute = ({ children }) => {
    if(!currentUser) return <Navigate to='/login' />

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    },
    {
      path: "/login",
      element: <Login />,
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
