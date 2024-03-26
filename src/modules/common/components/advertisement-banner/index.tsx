import image1 from './banner3.png'
import Link from 'next/link'
import Image from 'next/image'

const AdvertisementBanner = () => {
  return (
    <Link href="https://flagstaffwholesale.com/us/products/ebcreate-bc-5000">
    <div style={{ backgroundColor: "#f2f4ff", textAlign: "center", display: "flex", justifyContent: "space-evenly", width: "100%" }}>
      <div className='flex w-[20vh] h-[8vh]'>
      <Image
        src={image1.src} // Fix: Convert BannerImage to string by using .src property
        alt="Advertisement Banner"
        width={100}
        height={100}
      />
      </div>
      <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>New Flavors, Buy NOW!!!</p>
        <p style={{ fontSize: "14px", textAlign: "center" }}>EBCREATE BC Disposable Pod Device</p>
      </div>
    </div>
    </Link>
  );
};

export default AdvertisementBanner;
