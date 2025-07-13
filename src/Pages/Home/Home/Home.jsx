import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import ProductSection from '../ProductSection/ProductSection';
import AdvertisementCarousel from '../AdvertisementCarousel/AdvertisementCarousel';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    BB | Home
                </title>
            </Helmet>
            <div className='mb-16'>
                <Banner></Banner>
            </div>
            <div className='mb-16'>
                <ProductSection></ProductSection>
                <AdvertisementCarousel></AdvertisementCarousel>
                <HowItWorks></HowItWorks>
                <WhyChooseUs></WhyChooseUs>
            </div>

        </div>
    );
};

export default Home;