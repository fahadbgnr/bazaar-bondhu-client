import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxios from '../../../hooks/useAxios';

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axiosInstance.get('/advertisements/current');
        setAds(res.data);
      } catch (error) {
        console.error('Failed to load advertisements:', error);
      }
    };
    fetchAds();
  }, [axiosInstance]);

  if (ads.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-gray-500 dark:text-gray-400 italic">
        No current promotions available.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-2 text-center text-green-700 dark:text-green-400">
        🔥 Advertisement Highlights
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
        Explore all current promotions and vendor ads through this interactive carousel. All advertisements are dynamically loaded from the database.
      </p>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {ads.map((ad, index) => (
          <SwiperSlide key={ad._id?.$oid || ad._id || index}>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white dark:bg-gray-800">
              {ad.image ? (
                <img
                  src={ad.image}
                  alt={ad.title || 'Advertisement'}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-56 sm:h-64 md:h-72 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                  No Image Available
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate text-gray-800 dark:text-gray-200">
                  {ad.title || 'Untitled'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mt-1">
                  {ad.shortDescription || ad.description || 'No description available.'}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AdvertisementCarousel;
