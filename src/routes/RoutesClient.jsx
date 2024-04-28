import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../view/client/layout/Home';
import PlaceDetail from '../view/client/layout/placeDetail/PlaceDetail';
import Login from '../view/client/layout/auth/login/Login';
import Register from '../view/client/layout/auth/register/Register';

export default function RoutesClient() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/place/:placeId' element={<PlaceDetail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}
