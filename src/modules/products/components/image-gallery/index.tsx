'use client';
import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }
  return (
      // <div className="flex items-start relative">
        <div className="items-start small:mx-16 gap-y-4 relative">
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
                className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle border border-gray-300"
              id={image.id}
            >
              <Image
                src={image.url}
                priority={index <= 2 ? true : false}
                className="absolute inset-0 rounded-rounded"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                style={{
                  objectFit: "cover",
                }}
              />
            </Container>
          )
        })}
        </Slider>
       </div>
     // </div>
  )
}

export default ImageGallery
