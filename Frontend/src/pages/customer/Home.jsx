import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  // Animation controls for scroll-triggered animations
  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: false });
  const [inView2] = useInView({ threshold: 0.1, triggerOnce: false });
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    if (inView1) controls1.start("visible");
    if (inView2) controls2.start("visible");
  }, [controls1, controls2, inView1, inView2]);

  const features = [
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Get your food in under 30 minutes or it's free",
    },
    {
      icon: "🌟",
      title: "Premium Quality",
      description: "Only the freshest ingredients from trusted suppliers",
    },
    {
      icon: "💳",
      title: "Easy Payment",
      description: "Multiple payment options including cashless",
    },
    {
      icon: "🌱",
      title: "Eco-Friendly",
      description: "Sustainable packaging that's good for the planet",
    },
  ];

  return (
    <div className="font-poppins bg-[#FAFAF9] text-[#2E8B57] min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full h-screen"
      >
        <SwiperSlide>
          <div className="relative w-full h-screen flex items-center justify-center bg-black/50">
            <img
              src="/images/slider1.jpg"
              alt="Delicious Food"
              className="absolute inset-0 w-full h-full object-cover opacity-70 shadow-lg"
            />
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto text-[#FAFAF9]">
              <motion.h1
                className="text-6xl font-extrabold drop-shadow-lg tracking-wide"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Restoping
              </motion.h1>
              <motion.p
                className="text-lg mt-4 leading-relaxed tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Your favorite food delivery service that brings freshly prepared
                meals directly to your doorstep. Whether it&apos;s a quick snack
                or a full meal, <br /> we&apos;ve got you covered with a wide
                variety of options to satisfy your cravings.
              </motion.p>
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link to="/customer/menus">
                  <button className="mt-8 px-10 py-3 bg-[#2E8B57] text-[#FAFAF9] rounded-2xl text-xl font-semibold hover:bg-[#3CB371] hover:text-[#FAFAF9] transition duration-300 shadow-xl">
                    Order Now
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Enhanced Brand Introduction with Sophisticated Animation */}
      <div
        ref={ref1}
        className="container mx-auto py-28 px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-16"
      >
        {/* Text Content */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial="hidden"
          animate={controls1}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2E8B57] to-[#3CB371]">
                Elevate Your Dining Experience
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            At Restoping, we transcend ordinary food delivery. Our culinary
            artisans craft each dish with meticulous attention to detail, using
            premium seasonal ingredients to bring restaurant-quality excellence
            to your home.
          </motion.p>

          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            <Link to="/customer/about">
              <button className="px-10 py-3.5 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:ring-offset-2">
                Discover Our Story
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative z-10 rounded-3xl">
            <img
              src="/images/foodtable.png"
              alt="Artistically plated gourmet dishes"
              className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Floating food icons decoration */}
          <motion.div
            className="absolute -top-8 -left-8"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="bg-gradient-to-br from-[#FAFAF9] to-[#e8f5e9] py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#2E8B57] to-[#3CB371] mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Makes Us Different
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#2E8B57]">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Seller Menu - Expanded Grid Version */}
      <div className="w-full py-16 px-0 sm:px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2E8B57] to-[#3CB371] mb-2">
            Best Sellers
          </h2>
          <p className="text-md text-[#2E8B57] max-w-2xl mx-auto">
            Most loved dishes and drinks by our customers
          </p>
        </motion.div>

        {/* Food Best Sellers - Expanded */}
        <div className="mb-16 w-full">
          <h3 className="text-2xl font-bold text-[#2E8B57] mb-8 text-center">
            Food
          </h3>
          <div className="w-full px-0 sm:px-8">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={24}
              slidesPerView={"auto"}
              centeredSlides={false}
              className="!overflow-visible !px-4"
              breakpoints={{
                640: { spaceBetween: 32 },
                1024: { spaceBetween: 40 },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                <SwiperSlide
                  key={`food-${id}`}
                  className="!w-[180px] sm:!w-[200px]"
                >
                  <motion.div
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`/images/makanan/makanan${id}.png`}
                        alt={`Makanan ${id}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-sm sm:text-base font-medium text-[#2E8B57]">
                        {
                          [
                            "Nasi Goreng Spesial",
                            "Mie Ayam Jamur",
                            "Sate Madura",
                            "Bakso Jumbo",
                            "Ayam Geprek",
                            "Nasi Padang",
                            "Soto Betawi",
                            "Pecel Lele",
                            "Rawon Daging",
                          ][id - 1]
                        }
                      </h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Drink Best Sellers - Expanded */}
        <div className="mt-16 w-full">
          <h3 className="text-2xl font-bold text-[#2E8B57] mb-8 text-center">
            Drinks
          </h3>
          <div className="w-full px-0 sm:px-8">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              loop={true}
              spaceBetween={24}
              slidesPerView={"auto"}
              centeredSlides={false}
              className="!overflow-visible !px-4"
              breakpoints={{
                640: { spaceBetween: 32 },
                1024: { spaceBetween: 40 },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                <SwiperSlide
                  key={`drink-${id}`}
                  className="!w-[180px] sm:!w-[200px]"
                >
                  <motion.div
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`/images/minuman/minuman${id}.png`}
                        alt={`Minuman ${id}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-sm sm:text-base font-medium text-[#2E8B57]">
                        {
                          [
                            "Es Teh Manis",
                            "Jus Alpukat",
                            "Es Jeruk",
                            "Kopi Susu",
                            "Es Campur",
                            "Milkshake Coklat",
                            "Air Mineral",
                          ][id - 1]
                        }
                      </h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Interactive Gallery */}
      <div className="container mx-auto py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2E8B57] to-[#3CB371] mb-4">
            Our Culinary Journey
          </h2>
          <p className="text-lg text-[#2E8B57] max-w-2xl mx-auto">
            A visual story of flavors, passion, and unforgettable dining
            experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "gallery1",
            "gallery2",
            "gallery3",
            "gallery4",
            "gallery5",
            "gallery6",
          ].map((gallery, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-3xl aspect-square"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.98 }}
            >
              <img
                src={`/images/${gallery}.jpg`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-[#2E8B57] to-[#3CB371] py-20 text-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="pb-16"
          >
            {[1, 2, 3, 4].map((item) => (
              <SwiperSlide key={item}>
                <motion.div
                  className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm h-full"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-6 italic">
                    &quot;The food arrived hot and fresh, exactly as described.
                    The flavors were incredible - definitely ordering
                    again!&quot;
                  </p>
                  <div className="flex items-center">
                    <img
                      src={`/images/avatar${item}.jpg`}
                      alt={`Customer ${item}`}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold">Customer {item}</h4>
                      <p className="text-sm opacity-80">
                        Regular since 202{item}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#3CB371]/90"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience Culinary Excellence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying restaurant-quality
              meals at home
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/customer/menus">
                <button className="px-8 py-4 bg-white text-[#2E8B57] rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                  Order Now
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Map with Contact Info */}
      <div className="container mx-auto py-20 px-6">
        <div className="flex flex-col lg:flex-row lg:px-12 gap-1">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#2E8B57] mb-8">Find Us</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#2E8B57] p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2E8B57] mb-1">
                    Our Location
                  </h3>
                  <p className="text-gray-700">
                    123 Culinary Street, Food District, Jakarta 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#2E8B57] p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2E8B57] mb-1">
                    Contact Us
                  </h3>
                  <p className="text-gray-700">+62 812 3456 7890</p>
                  <p className="text-gray-700">hello@restoping.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#2E8B57] p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2E8B57] mb-1">
                    Opening Hours
                  </h3>
                  <p className="text-gray-700">Monday - Friday: 9AM - 10PM</p>
                  <p className="text-gray-700">Weekend: 10AM - 11PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 h-96 lg:h-auto rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9174235423136!2d106.8271534153139!3d-6.175392595534684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f142ebfcde39%3A0x3a0a0b0c8d1a1448!2sJakarta!5e0!3m2!1sen!2sid!4v1645625291035!5m2!1sen!2sid"
              allowFullScreen
              loading="lazy"
              title="Restoping Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
