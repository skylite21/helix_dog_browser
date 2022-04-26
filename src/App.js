import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BreedListPage from './BreedListPage';
import BreedPage from './BreedPage';
import RandomImagePage from './RandomImagePage';
import Header from './components/Header';
import BreedListContext from './BreedListContext';
import './scss/style.scss';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  // prop drilling problem
  const [breedListContext, setBreedListContext] = useState([]);

  useEffect(() => {
    async function getBreedList() {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const { message } = await response.json();

      const breedList = Object.keys(message).flatMap((key) =>
        message[key].length === 0 ? key : message[key].map((subBreed) => `${subBreed} ${key}`)
      );
      return breedList;
    }
    getBreedList().then((list) => {
      setBreedListContext(list);
    });
  }, []);

  return (
    <>
      <BreedListContext.Provider value={[breedListContext, setBreedListContext]}>
        <BrowserRouter>
          <Header />
          <nav className='main-menu'>
            <Link to='/' className='menu-item'>
              Home
            </Link>
            <Link to='/list' className='menu-item'>
              Breed List
            </Link>
          </nav>
          <div className='content'>
            <Routes>
              <Route path='/' element={<RandomImagePage />} />
              <Route
                path='/list'
                element={
                  <ErrorBoundary>
                    <BreedListPage />
                  </ErrorBoundary>
                }
              />
              <Route path='/breed/:breed' element={<BreedPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BreedListContext.Provider>
    </>
  );
};
export default App;
