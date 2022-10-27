import React from 'react';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './App.scss';
import Protected from './Protected';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Verify from './Pages/Verify';
import AdminLogin from './Pages/Admin/AdminLogin';
import Dashboard from './Pages/Admin/Dashboard';

function App() {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user);
  const isLoggedIn = user?.token ? true : false;
  console.log(user?.token);
  const isRegistered = user ? true : false
  console.log(isLoggedIn , isRegistered , ' appp');

  const admin = JSON.parse(localStorage.getItem('admin'))
  const isAdmin = admin?.token ? true : false
  console.log(admin , isAdmin , 'fff');
  return (
      <div className="App">
        <Routes>

          <Route path='/' element={
            <Protected isLoggedIn={isLoggedIn}>
                <Home />
            </Protected>
          } />

          <Route path='/verify' element={
            // <Protected isLoggedIn={isRegistered}>
             isRegistered ? isLoggedIn ? <Navigate to={'/login'} /> : <Verify/> : <Navigate to={'/login'} />
            // </Protected>
          } />

          <Route path='/register' element={isLoggedIn ? <Navigate to={'/'}/> : <Register />} />

          <Route path='/login' element={
            isRegistered ? isLoggedIn ? <Navigate to={'/'} /> : <Navigate to={'/verify'} /> : 
          <Login />
          } />

          <Route path='/admin' element={isAdmin ? (<Navigate to={'/admin/dashboard'}/>) : (<AdminLogin/>)} />
          
          <Route path='/admin/dashboard' element={isAdmin ? (<Dashboard/>) : (<Navigate to={'/admin'}/>)} />

        </Routes>
      </div>
  );
}

export default App;
