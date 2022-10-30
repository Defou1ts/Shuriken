import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliderItems } from '../../slices/sliderSlice';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from 'firebase/database';

import './slider.scss';

import SliderSlide from '../sliderSlide/SliderSlide';
import Spinner from '../spinner/Spinner';

import leftArrow from '../../assets/arrowleft.svg';
import rightArrow from '../../assets/arrowright.svg';

const Slider = () => {
  //TODO: ADD ERROR MESSAGE
  const dispatch = useDispatch();
  const sliderItems = useSelector((state) => state.slider.sliderItems);
  const sliderItemsLoadingStatus = useSelector(
    (state) => state.slider.sliderItemsLoadingStatus
  );
  const [position, setPosition] = useState(0);
  const [current, setCurrent] = useState(1);
  const count = 3;

  useEffect(() => {
    dispatch(fetchSliderItems(count));
  }, []);

  useEffect(() => {
    setPosition(window.innerWidth * (current - 1));
  }, [current]);

  const nextSlide = () => {
    setPosition((position) => position + window.innerWidth);
    setCurrent((current) => current + 1);
    if (position >= window.innerWidth * (count - 1)) {
      setPosition(0);
      setCurrent(1);
    }
  };

  const prevSlide = () => {
    setPosition((position) => position - window.innerWidth);
    setCurrent((current) => current - 1);
    if (position <= 0) {
      setPosition(window.innerWidth * (count - 1));
      setCurrent(count);
    }
  };

  const setSlide = (i) => {
    setCurrent(i);
  };

  const renderSlider = (sliderItems, count) => {
    const renderedSliderItems = sliderItems.map(({ ...props }) => (
      <SliderSlide key={uuidv4()} {...props} />
    ));

    const renderedDots = [];

    for (let i = 1; i <= count; i++) {
      renderedDots.push(
        <div
          onClick={() => setSlide(i)}
          key={uuidv4()}
          className={`slider__dot ${i === current ? 'active' : ''}`}
        ></div>
      );
    }

    return {
      renderedSliderItems,
      renderedDots,
    };
  };

  if (sliderItemsLoadingStatus === 'loading') {
    return <Spinner />;
  }
  if (sliderItemsLoadingStatus === 'error') {
    return <p>Ошибка</p>;
  }

  const { renderedSliderItems, renderedDots } = renderSlider(
    sliderItems,
    count
  );

  return (
    <div className="slider">
      <div className="slider__dots">{renderedDots}</div>
      <img
        onClick={prevSlide}
        src={leftArrow}
        alt="Prev btn"
        className="slider__prev-btn slider__arrow"
      />
      <img
        onClick={nextSlide}
        src={rightArrow}
        alt="Next btn"
        className="slider__next-btn slider__arrow"
      />
      <div className="slider__container">
        <div style={{ left: `-${position}px` }} className="slider__field">
          {renderedSliderItems}
        </div>
      </div>
    </div>
  );
};

export default Slider;
