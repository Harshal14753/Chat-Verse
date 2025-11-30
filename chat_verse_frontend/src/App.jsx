import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router'
import UserContext from "./context/UserContext.jsx";
import AuthValidator from "./components/AuthValidator.jsx";
import {useContext} from "react";

function App() {
  // Check if current path starts with /chat/
  // const isChatRoute = window.location.pathname.startsWith('/chat/')

        const {isAuthenticated} = useContext(UserContext);

  return (
    <>
        {/*<AuthValidator>*/}
        {!isAuthenticated && <Header />}
                <Outlet/>
        {!isAuthenticated && <Footer />}
        {/*</AuthValidator>*/}
    </>
  )
}

export default App
