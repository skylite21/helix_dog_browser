import React, { useEffect, useState } from 'react';

const LazyImage = ({ src, alt = '', ...props }) => {
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    const res = await fetch(src);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchImage();
  }, [src]);

  return loading ? <h1>Loading...</h1> : <img alt={alt} src={img} {...props} />;
};

export default LazyImage;
