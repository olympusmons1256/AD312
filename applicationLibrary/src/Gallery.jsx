import { useState } from 'react'

export const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    description: 'Wood-fired Margherita pizza with fresh basil and mozzarella.'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
    description: 'Avocado toast topped with poached egg and chili flakes.'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    description: 'Colorful garden salad with citrus dressing.'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
    description: 'Creamy mushroom pasta finished with parmesan and herbs.'
  }
]

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1))
  }

  const currentImage = images[currentIndex]
  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === images.length - 1

  return (
    <section className="gallery-card">
      <h2>Recipe Gallery</h2>

      <div className="gallery-image-frame">
        <img src={currentImage.url} alt={currentImage.description} className="gallery-image" />
      </div>

      <p className="gallery-caption">{currentImage.description}</p>
      <p className="gallery-index">
        {currentIndex + 1} / {images.length}
      </p>

      <div className="gallery-actions">
        <button onClick={handlePrevious} disabled={isFirstImage}>
          Previous
        </button>
        <button onClick={handleNext} disabled={isLastImage}>
          Next
        </button>
      </div>
    </section>
  )
}

export default Gallery