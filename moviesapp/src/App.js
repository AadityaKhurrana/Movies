import React from 'react';
import './App.css';
import Banner from './components/Banner';
import Favourite from './components/Favourite';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
          <Route path='/' element={<> <Banner/><MovieList/></>}/>
          <Route path='/favourite' element={<>  <Favourite/></>}/>
      </Routes>
      
     
    </BrowserRouter>
  );
}

export default App;
