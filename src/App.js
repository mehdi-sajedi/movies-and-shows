import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import Header from './components/Header';
import Grid from './components/Grid';

const movies = `https://api.themoviedb.org/3/discover/movie?vote_count.gte=2500&vote_average.gte=7.8&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;

const tvShows = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route exact path="/" element={<Grid url={movies} />}></Route>
          <Route exact path="tv" element={<Grid url={tvShows} />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;