import React from 'react';
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";

const Carousel = ({ cardDetail, currentIndex, setCurrentIndex }) => {

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cardDetail.cardItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardDetail.cardItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container w-full">
      <div className='carousel-item sm:grid grid-cols-12 rounded-lg p-4 w-full bg-white'>
        <div className="col-span-6 p-2">
          <img
            src={
              cardDetail.cardItems[currentIndex].image
                ? cardDetail.cardItems[currentIndex].image
                : 'placeholder-image-url'
            }
            alt={`Flashcard ${currentIndex + 1}`}
          />
        </div>
        <div className="col-span-6 p-2 overflow-auto">
          {cardDetail.cardItems[currentIndex].definition}
        </div>

      </div>
      <div className='flex justify-center gap-2 p-2 text-gray-500'>

        <button onClick={goToPrevious} aria-label='previous-carousel-item'><FaLessThan /></button>
        <p className='px-10'>{currentIndex + 1} / {cardDetail.cardItems.length}</p>
        <button onClick={goToNext} aria-label='next-carousel-item'><FaGreaterThan /></button>
      </div>

    </div>
  );
};

export default Carousel;