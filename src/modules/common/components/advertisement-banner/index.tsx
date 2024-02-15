import image1 from './banner3.png'
import image2 from './banner4.png'
const AdvertisementBanner = () => {
  return (
    <div style={{ backgroundColor: "#f2f4ff", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
      <img
        src={image1.src} // Fix: Convert BannerImage to string by using .src property
        alt="Advertisement Banner"
        style={{ width: "auto", maxHeight: "80px" }} // Adjust styles as needed
      />
      <img
        src={image2.src} // Fix: Convert BannerImage to string by using .src property
        alt="Advertisement Banner"
        style={{ width: "auto", maxHeight: "80px" }} // Adjust styles as needed
      />
    </div>
  );
};

export default AdvertisementBanner;
