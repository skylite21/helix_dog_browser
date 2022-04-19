import React, { useState, useEffect } from 'react';
import './scss/style.scss';
import SearchField from './components/SearchField';

const App = () => {
  const [breedList, setBreedList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    async function getBreedList() {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const { message } = await response.json();

      const breedList = Object.keys(message).flatMap((key) =>
        message[key].length === 0 ? key : message[key].map((subBreed) => `${subBreed} ${key}`)
      );

      // const breedList = [];
      // for (let breed in message) {
      //   if (message[breed].length === 0) {
      //     breedList.push(breed);
      //   } else {
      //     for (const subBereed of message[breed]) {
      //       breedList.push(subBereed + ' ' + breed);
      //     }
      //   }
      // }

      return breedList;
    }

    getBreedList().then((list) => {
      console.log(list);
      setBreedList(list);
    });
  }, []);

  return (
    <div>
      <SearchField options={breedList} placeholder='Search for a breed...' onChange={setSelectedBreed} />
    </div>
  );
};
export default App;
