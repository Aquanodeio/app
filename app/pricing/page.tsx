import React from 'react';
import PricingComponent from '@/components/Pricing';
import Navbar from '@/components/Navbar';

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-blue-50">
      <Navbar />
      <PricingComponent />
    </div>
  );
};

export default PricingPage;
