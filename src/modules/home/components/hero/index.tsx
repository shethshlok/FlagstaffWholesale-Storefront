'use client'

import { Button, Heading } from "@medusajs/ui";
import { useRouter } from 'next/navigation';
import HeroImage1 from '/home/chiragpatel/flagstaff-wholesale-storefront/src/app/HeroImage.png';
import HeroImage2 from '/home/chiragpatel/flagstaff-wholesale-storefront/src/app/HeroImage2.png';
import Image from 'next/image';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Hero = () => {
  const router = useRouter();

  const redirectToStore = () => {
    router.push('/store');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Add autoplay setting
    autoplaySpeed: 3000, // Set autoplay speed to 3 seconds
  }

  const images = [
    {
      id: 1,
      url: HeroImage1.src,
    },
    {
      id: 2,
      url: HeroImage2.src,
    },
  ];

  return (
    <div className="h-[120vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center gap-6">
      <div className="w-full order-0 flex-0 flex-1-auto self-center">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image src={image.url} alt={`Hero Image ${index + 1}`} width={1920} height={1080} />
          </div>
        ))}
      </Slider>
      </div>
        <span>
          <div>
            <Heading
              level="h1"
              className="text-3xl leading-10 text-ui-fg-base large-text-semi"
            >
              Welcome to Flagstaff Wholesale Online Store
            </Heading>
          </div>
        </span>
        <Button onClick={redirectToStore}>Go to Store</Button>
      </div>
    </div>
  );
};

export default Hero;
