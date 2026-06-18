import { useMemo } from 'react';
import { carouselImages } from '../utils/constants';

export default function Carousel({ carouselIndex, setCarouselIndex, startCarouselRotation, stopCarouselRotation }) {
  const carouselTransform = useMemo(
    () => ({ transform: `translateX(-${carouselIndex * 100}%)` }),
    [carouselIndex]
  );

  return (
    <section className="carousel-section" aria-label="Carrusel de imágenes">
      <div
        className="carousel"
        aria-roledescription="carousel"
        onMouseEnter={stopCarouselRotation}
        onMouseLeave={startCarouselRotation}
      >
        <div className="carousel-track" style={carouselTransform}>
          {carouselImages.map((slide, index) => (
            <div className="carousel-slide" key={slide.src} data-index={index}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>

        <button
          className="carousel-button prev"
          type="button"
          aria-label="Imagen anterior"
          onClick={() => setCarouselIndex((index) => (index - 1 + carouselImages.length) % carouselImages.length)}
        >
          ‹
        </button>
        <button
          className="carousel-button next"
          type="button"
          aria-label="Imagen siguiente"
          onClick={() => setCarouselIndex((index) => (index + 1) % carouselImages.length)}
        >
          ›
        </button>

        <div className="carousel-dots" role="tablist" aria-label="Seleccionar imagen">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === carouselIndex ? 'active' : ''}`}
              type="button"
              aria-label={`Ver imagen ${index + 1}`}
              onClick={() => setCarouselIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
