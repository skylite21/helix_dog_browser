import { useState, useEffect, useDebugValue } from 'react';

const localCache = {};

export default function useImageURL(breed) {
  const [imageURL, setImageURL] = useState(null);
  const [status, setStatus] = useState('unloaded');
  useDebugValue(`status: ${JSON.stringify(status)}`);

  const getImageList = async (selectedBreed) => {
    setStatus('loading');
    if (!selectedBreed) return;
    selectedBreed = selectedBreed.split(' ');
    let urlString;
    if (selectedBreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${selectedBreed[0]}/images`;
    } else if (selectedBreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${selectedBreed[1]}/${selectedBreed[0]}/images`;
    }
    const response = await fetch(urlString);
    const { message } = await response.json();
    return message;
  };

  const updateURL = () => {
    const url = localCache[breed][Math.floor(Math.random() * localCache[breed].length)];
    setImageURL(url);
  };

  const getAllImages = async () => {
    if (localCache[breed]) return localCache[breed];
    const list = await getImageList(breed);
    localCache[breed] = list;
    return list;
  };

  useEffect(() => {
    if (!breed) return;
    if (localCache[breed]) {
      updateURL();
    } else {
      getImageList(breed).then((list) => {
        localCache[breed] = list;
        updateURL();
        setStatus('loaded');
      });
    }
  }, [breed]);

  return [imageURL, updateURL, getAllImages];
}
