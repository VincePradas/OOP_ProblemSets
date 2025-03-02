import React, { useState, useEffect } from 'react';
import "../CSS/nav.css";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const images = [
  { src: require('../assets/imgs/Captcha/cat01.png'), isCat: true },
  { src: require('../assets/imgs/Captcha/dog01.png'), isCat: false },
  { src: require('../assets/imgs/Captcha/hamster01.png'), isCat: false },
  { src: require('../assets/imgs/Captcha/cat02.png'), isCat: true },
  { src: require('../assets/imgs/Captcha/penguin01.png'), isCat: false },
  { src: require('../assets/imgs/Captcha/otter01.png'), isCat: false },
  { src: require('../assets/imgs/Captcha/lama01.png'), isCat: false },
  { src: require('../assets/imgs/Captcha/pig01.png'), isCat: false },
  { src: require('../assets/imgs/Captcha/cat03.png'), isCat: true },
];

const CatCaptcha = ({ onComplete }) => {
    const [shuffledImages, setShuffledImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        setShuffledImages(shuffleArray(images));
    }, []);

    const handleImageClick = (index) => {
        setSelectedImages((prevSelected) => {
          if (prevSelected.includes(index)) {
            return prevSelected.filter((i) => i !== index);
          } else {
            return [...prevSelected, index];
          }
        });
    };
    
    const handleSubmit = () => {
        const isCorrect = selectedImages.every((index) => shuffledImages[index].isCat) &&
                          selectedImages.length === shuffledImages.filter(img => img.isCat).length;
        onComplete(isCorrect);
    };
  
    return (
      <div className='captchaContainer'>
        <h5>Select all images of 🐱</h5>
        <div className='captchaContent'>
          {shuffledImages.map((img, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              style={{border: selectedImages.includes(index) ? '5px solid red' : '5px solid transparent'}}
            >
              <img src={img.src} alt="" />
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>VERIFY CATS 🐱</button>
      </div>
    );
};

export default CatCaptcha;
