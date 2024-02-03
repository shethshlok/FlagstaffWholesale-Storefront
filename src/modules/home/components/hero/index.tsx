'use client'

import { Button, Heading } from "@medusajs/ui";
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const redirectToStore = () => {
    router.push('/store');
  };

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
        <Button onClick={redirectToStore}>Go to Store</Button>
      </div>
    </div>
  );
};

export default Hero;
