'use client'

import { Button, Heading } from "@medusajs/ui";
import { useRouter } from 'next/navigation';
import HeroImage1 from '/var/www/FlagstaffWholesale-Storefront/src/app/HeroImage.png';
import HeroImage2 from '/var/www/FlagstaffWholesale-Storefront/src/app/HeroImage2.png';
import HeroImage4 from '/var/www/FlagstaffWholesale-Storefront/src/app/HeroImage4.png';

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
    {
      id: 4,
      url: HeroImage4.src,
    },
  ];

  return (
    <div className="h-[80vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-x-hidden">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center small:p-32 text-center gap-6">
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
      <div className="w-full order-0 flex-0 flex-1-auto self-center">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <Image src={image.url} alt={`Hero Image ${index + 1}`} className="object-contain" width={1000} height={100} style={{ height: '60vh', width: 'auto' }} />
            </div>
          </div>
        ))}
      </Slider>
      </div>
        <Button className="p-4" onClick={redirectToStore}>Go to Store</Button>
      </div>
    </div>
  );
};

export default Hero;
