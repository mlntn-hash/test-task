import { useState, useEffect, type TouchEvent } from "react";
import "./testimonialsSlider.scss";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Олена",
    text: "В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента",
    image: "pol3.webp",
  },
  {
    id: 2,
    name: "Іван",
    text: "В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента",
    image: "pol4.webp",
  },
  {
    id: 3,
    name: "Артем",
    text: "В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента",
    image: "pol5.webp",
  },
  {
    id: 4,
    name: "Марія",
    text: "В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента",
    image: "pol1.webp",
  },
  {
    id: 5,
    name: "Петро",
    text: "В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента.В большинстве случаев именно такой вид доставки оказывается самым выгодным для клиента",
    image: "pol2.webp",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getVisibleAvatars = () => {
    const visible: (Testimonial & { originalIndex: number; isActive: boolean })[] = [];
    const totalVisible = 5;
    const middleIndex = Math.floor(totalVisible / 2);

    for (let i = 0; i < totalVisible; i++) {
      const testimonialIndex =
        (current - middleIndex + i + testimonials.length) % testimonials.length;

      visible.push({
        ...testimonials[testimonialIndex],
        originalIndex: testimonialIndex,
        isActive: i === middleIndex,
      });
    }
    return visible;
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;

    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();

    setTouchStartX(null);
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">Відгуки</h2>

      {isMobile ? (
        <>
          {/* Mobile */}
          <div
            className="avatar-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="avatar active"
            />
          </div>

          <div className="text-block">
            <p className="text">{testimonials[current].text}</p>
            <h3 className="name">{testimonials[current].name}</h3>
          </div>

          <div className="dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Desktop */}
          <div className="avatars">
            {getVisibleAvatars().map((item, index) => (
              <img
                key={`${item.id}-${index}`}
                src={item.image}
                alt={item.name}
                className={`avatar ${item.isActive ? "active" : ""}`}
                onClick={() => setCurrent(item.originalIndex)}
              />
            ))}
          </div>

          <div className="text-block">
            <p className="text">{testimonials[current].text}</p>
            <h3 className="name">{testimonials[current].name}</h3>
          </div>

          <div className="buttons">
            <button onClick={prevSlide} className="arrow-btn">
              <img src={ArrowLeft} alt="Previous" />
            </button>
            <button onClick={nextSlide} className="arrow-btn">
              <img src={ArrowRight} alt="Next" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
