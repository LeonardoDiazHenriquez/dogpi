import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ListingDogs from './pages/listing-dogs';
import LandingPage from './pages/landing-page';
import DetailDog from './components/dogDetail';
import AddDogForm from './components/AddDogForm';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dogs" element={<ListingDogs />}></Route>
        <Route path="/dogs/:id" element={<DetailDog />}></Route>
        <Route path="/dogs/form" element={<AddDogForm />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
