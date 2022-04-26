import React, { useState, useEffect, useContext } from 'react';
import './scss/style.scss';
import SearchField from './components/SearchField';
import LazyImage from './components/LazyImage';
import useImageURL from './useImageURL';
import BreedListContext from './BreedListContext';

const RandomImagePage = () => {
  // context előtt:
  // const [breedList, setBreedList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [imageURL, updateURL] = useImageURL(selectedBreed);

  const [breedListContext] = useContext(BreedListContext);

  // throw new Error('lol');

  // custom hoook előtt:
  // const [imageURL, setImageURL] = useState(null);
  // useEffect(() => {
  //   async function getBreedList() {
  //     const response = await fetch('https://dog.ceo/api/breeds/list/all');
  //     const { message } = await response.json();
  //
  //     const breedList = Object.keys(message).flatMap((key) =>
  //       message[key].length === 0 ? key : message[key].map((subBreed) => `${subBreed} ${key}`)
  //     );
  //
  //     // const breedList = [];
  //     // for (let breed in message) {
  //     //   if (message[breed].length === 0) {
  //     //     breedList.push(breed);
  //     //   } else {
  //     //     for (const subBereed of message[breed]) {
  //     //       breedList.push(subBereed + ' ' + breed);
  //     //     }
  //     //   }
  //     // }
  //
  //     return breedList;
  //   }
  //
  //   getBreedList().then((list) => {
  //     console.log(list);
  //     setBreedList(list);
  //   });
  // }, []);
  // useEffect(() => {
  //   getImageURL(selectedBreed).then((url) => url && setImageURL(url));
  // }, [selectedBreed]);

  // Context Előtt:

  // useEffect(() => {
  //   async function getBreedList() {
  //     const response = await fetch('https://dog.ceo/api/breeds/list/all');
  //     const { message } = await response.json();
  //
  //     const breedList = Object.keys(message).flatMap((key) =>
  //       message[key].length === 0 ? key : message[key].map((subBreed) => `${subBreed} ${key}`)
  //     );
  //     return breedList;
  //   }
  //   getBreedList().then((list) => {
  //     setBreedList(list);
  //   });
  // }, []);

  return (
    <div className='column'>
      <SearchField options={breedListContext} placeholder='Search for a breed...' onChange={setSelectedBreed} />
      {imageURL && (
        <button
          className='refresh'
          onClick={() => {
            updateURL();
            // getImageURL(selectedBreed).then((url) => url && setImageURL(url));
          }}>
          refresh
        </button>
      )}

      {imageURL && <LazyImage className='dog-image' src={imageURL} />}
    </div>
  );
};
export default RandomImagePage;
