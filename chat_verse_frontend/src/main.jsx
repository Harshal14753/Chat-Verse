import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import Chat from './pages/Chat.jsx'
import { Toaster } from 'react-hot-toast'
import {UserProvider} from './context/UserContext.jsx'
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster position='top-center'/>
    <UserProvider >

    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      {/*<Route path="/chat/" element={<App />}>*/}
      {/*  <Route path="profile" element={<Profile />} />*/}
      {/*  <Route path="personal" element={<Chat />} />*/}
      {/*</Route>*/}

        <Route path="/" element={<App />}>
            <Route path="profile" element={<PrivateRoute element={<Profile />} roles={["ROLE_USER", "ROLE_ADMIN"]} />}/>
            <Route path="change-password" element={<PrivateRoute element={<ChangePassword />} roles={["ROLE_USER", "ROLE_ADMIN"]} />}/>
        </Route>

        <Route path='/chat/' element={<App />}>
            {/*<Route path='personal/:phoneNumber' element={<PrivateRoute element={<Chat />} roles={"ROLE_USER"} />} />*/}
            <Route path='personal/' element={<PrivateRoute element={<Chat />} roles={"ROLE_USER"} />} />
        </Route>

        {/*<Route path='/admin/' element={<App />}>*/}
        {/*    <Route path='profile' element={<PrivateRoute element={<Profile />} roles={"ROLE_ADMIN"} />}/>*/}
        {/*</Route>*/}
    </Routes>
    </UserProvider>
  </BrowserRouter>,
)
