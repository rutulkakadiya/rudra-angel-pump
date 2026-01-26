import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const products = [
  { id: 1, name: 'Regenerative Self-Priming Pumps', desc: 'Efficient self-priming action for domestic and light industrial use.', image: '/Images/product_1.png' },
  { id: 2, name: 'Centrifugal Mono-bloc Pumps', desc: 'Compact pumping solution for agriculture and civil water supply.', image: '/Images/product_2.png' },
  { id: 3, name: '3" Bore-well Submersible Pumps', desc: 'Ideal for narrow borewells with reliable performance.', image: '/Images/product_3.png' },
  { id: 4, name: '4" Bore-well Submersible Pumps', desc: 'High-efficiency submersible pumps for domestic supply.', image: '/Images/product_4.png' },
  { id: 5, name: '5" Bore-well Submersible Pumps', desc: 'Robust design for agricultural irrigation needs.', image: '/Images/product_5.png' },
  { id: 6, name: '6" Bore-well Submersible Pumps', desc: 'Heavy-duty pumps for industrial and large-scale farming.', image: '/Images/product_6.png' },
  { id: 7, name: '7" Bore-well Submersible Pumps', desc: 'High-discharge pumps for extensive water requirements.', image: '/Images/product_7.png' },
  { id: 8, name: '8" Bore-well Submersible Pumps', desc: 'Maximum power for deep extractions and commercial use.', image: '/Images/product_8.png' },
  { id: 9, name: '8" Bore-well Submersible (Neptune)', desc: 'Premium Neptune series for superior durability.', image: '/Images/product_9.png' },
  { id: 10, name: '8" Bore-well Submersible (Jupiter)', desc: 'Jupiter series engineered for extreme conditions.', image: '/Images/product_10.png' },
  { id: 11, name: 'Open-well Submersible (Mini) Mercury', desc: 'Compact open-well solutions for shallow water sources.', image: '/Images/product_11.png' },
  { id: 12, name: 'Open-well Submersible (Big) Venus', desc: 'High-capacity Venus series for open reservoirs.', image: '/Images/product_12.png' },
  { id: 13, name: 'Open-well Submersible (Big) Mars', desc: 'Powerful Mars series for demanding open-well applications.', image: '/Images/product_13.png' },
  { id: 14, name: 'Open-well Submersible (Vertical)', desc: 'Vertical installation design for space-constrained wells.', image: '/Images/product_14.png' },
];

const ProductSection = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="w-[95%] xl:w-[90%] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
            className="inline-block py-1 px-3 rounded-full bg-white text-primary text-xs font-bold tracking-wider mb-4 border border-red-100"
          >
            OUR PRODUCTS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Precision Engineered <span className="text-primary">Pumping Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-gray-600 text-lg"
          >
            Explore our extensive range of high-performance pumps designed for efficiency and durability.
          </motion.p>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative group/slider"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            loop
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-16"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-full flex">
                <div className="h-full min-h-[540px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col w-full">

                  {/* Image */}
                  <div className="h-[300px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-3">
                      {product.desc}
                    </p>

                    <div className="mt-auto pt-4 border-t flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">
                        View More
                      </span>
                      <div className="h-8 w-8 rounded-full bg-red-50 text-primary flex items-center justify-center">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="custom-prev absolute top-1/2 -left-6 z-20 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center hover:text-primary transition opacity-0 group-hover/slider:opacity-100">
            <ChevronLeft size={24} />
          </button>

          <button className="custom-next absolute top-1/2 -right-6 z-20 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center hover:text-primary transition opacity-0 group-hover/slider:opacity-100">
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
