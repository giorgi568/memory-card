import { useState, useEffect } from 'react';

export default function Card({ imageUrl }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleOnLoad = () => {
    setImageLoaded(true);
  };
  useEffect(() => {
    setImageLoaded(false);
    let image = new Image();
    image.src = imageUrl;
    image.onload = handleOnLoad;
  },[imageUrl]);

  return (
    <div
      // style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.1s ease-in-out' }}
    >
      {!imageLoaded ? (
        <div> Loading ... </div>
      ): (
        <img className='card' src={imageUrl} onLoad={handleOnLoad} />
      )} 
    </div>
  );
}
