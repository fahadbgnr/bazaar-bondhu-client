import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import ProductSection from '../ProductSection/ProductSection';
import AdvertisementCarousel from '../AdvertisementCarousel/AdvertisementCarousel';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductSection></ProductSection>
            <AdvertisementCarousel></AdvertisementCarousel>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
            
        </div>
    );
};

export default Home;