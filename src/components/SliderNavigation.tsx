
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

const SliderNavigation = ({ onPrev, onNext }) => {
  return (
    <div className="slider-navigation">
      <div className="slider-scrollbar"></div>
      <div className="scrollbar-arrows">
        <div className="scrollbar-left__arrow" onClick={onPrev}>
          <img className="arrow-image" src={arrowLeft} alt="Стрелочка влево" />
        </div>
        <div className="scrollbar-right__arrow" onClick={onNext}>
          <img className="arrow-image" src={arrowRight} alt="Стрелочка вправо" />
        </div>
      </div>
    </div>
  );
};

export default SliderNavigation;
