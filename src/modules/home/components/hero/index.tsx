import { useEffect, useState } from 'react';
import { Button, Heading } from "@medusajs/ui";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

  useEffect(() => {
    // Fetch products from Medusa backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/v1/products`); // Update the URL to your Medusa backend
        const data = await response.json();

        // Assuming data is an array of products
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base large-text-semi"
          >
            Welcome to Flagstaff Wholesale Online Store
          </Heading>
        </span>

        {/* Display fetched products */}
        <div className="flex flex-wrap justify-center gap-4">
          {products.slice(0, 8).map(product => (
            <div key={product.id} className="border p-4">
              <Heading level="h2" className="text-lg">{product.title}</Heading>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm font-bold">${product.price / 100}</p>
              {/* Add any additional product information you want to display */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
