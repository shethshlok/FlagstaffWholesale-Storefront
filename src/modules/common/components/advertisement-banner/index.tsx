import image1 from './banner3.png'
import Link from 'next/link'

const AdvertisementBanner = () => {
  return (
    <Link href="http://72.167.151.168:8000/us/products/ebcreate-bc-5000">
    <div style={{ backgroundColor: "#f2f4ff", textAlign: "center", display: "flex", justifyContent: "space-evenly", width: "100%" }}>
      <img
        src={image1.src} // Fix: Convert BannerImage to string by using .src property
        alt="Advertisement Banner"
        style={{ width: "auto", maxHeight: "80px" }} // Adjust styles as needed
      />
      <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>New Flavors, Buy NOW!!!</p>
        <p style={{ fontSize: "14px", textAlign: "center" }}>EBCREATE BC Disposable Pod Device</p>
      </div>
    </div>
    </Link>
  );
};

export default AdvertisementBanner;
