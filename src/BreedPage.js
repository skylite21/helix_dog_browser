import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LazyImage from './components/LazyImage';
import useImageURL from './useImageURL';

const BreedPage = () => {
  const { breed } = useParams();
  const [, , getAllImages] = useImageURL(breed);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getAllImages().then((imageList) => setImageList(imageList));
  }, []);

  return (
    <>
      {imageList &&
        imageList.map((imageSrc, index) => <LazyImage key={index} className='dog-image' src={imageSrc} alt={breed} />)}
    </>
  );
};

export default BreedPage;
