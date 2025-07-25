import logo from './logo.svg';
import './App.css';
import Login from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/HomePage';
import { Route, Router, Routes, useRoutes } from 'react-router-dom';
import { routes } from './routes';



function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
