import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  gradient: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Machine Learning Made Simple",
    description: "Discover powerful ML libraries with intuitive documentation and real-world examples.",
    gradient: "from-primary/20 to-secondary/20"
  },
  {
    id: 2,
    title: "Data Science Excellence", 
    description: "Master data analysis with comprehensive guides for pandas, numpy, and visualization tools.",
    gradient: "from-secondary/20 to-accent/20"
  },
  {
    id: 3,
    title: "Web Development Power",
    description: "Build amazing applications with Django, FastAPI, and modern Python web frameworks.",
    gradient: "from-accent/20 to-primary/20"
  }
];

const Carousel: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Explore Python Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From machine learning to web development, discover the tools that power modern Python development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-primary/50 !w-3 !h-3',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary'
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            loop={true}
            className="h-96 rounded-3xl overflow-hidden"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={`relative h-full bg-gradient-to-br ${slide.gradient} glass rounded-3xl p-12 flex items-center justify-center`}>
                  <div className="text-center max-w-2xl">
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p 
                      className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                  <div className="absolute bottom-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-lg" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Carousel;