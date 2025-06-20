import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { DynamicImageCarousel } from "@/components/DynamicImageCarousel";

// Define partner logos data for the carousel
const partnerLogos = [
  {
    src: "/figmaAssets/65f4ebbc4acc8a860cea64ab-jigsaw-logo-1024x563-p-500-png.png",
    width: "115px",
    height: "63px",
    top: "18px",
    left: "30px",
  },
  {
    src: "/figmaAssets/6718f018c73e457382cba7ec-loavies-logo-p-500-png.png",
    width: "115px",
    height: "12px",
    top: "44px",
    left: "205px",
  },
  {
    src: "/figmaAssets/671901103f99ab6c61855fc9-me--2b-em-logo-webp.png",
    width: "115px",
    height: "66px",
    top: "17px",
    left: "380px",
  },
  {
    src: "/figmaAssets/64b9419e944f52bfc0fb491d-nudeproject-p-500-png.png",
    width: "115px",
    height: "12px",
    top: "44px",
    left: "555px",
  },
  {
    src: "/figmaAssets/65f4ea0e2419a8d81cbb4fdb-logo-pandaco-p-500-png.png",
    width: "115px",
    height: "23px",
    top: "38px",
    left: "730px",
  },
  {
    src: "/figmaAssets/layer-1-2.png",
    width: "115px",
    height: "13px",
    top: "43px",
    left: "905px",
  },
  {
    src: "/figmaAssets/group.png",
    width: "115px",
    height: "16px",
    top: "42px",
    left: "1080px",
    isGroup: true,
  },
  {
    src: "/figmaAssets/65f4ecc40401bc4c0843a316-logo-silbon-p-500-webp.png",
    width: "115px",
    height: "48px",
    top: "26px",
    left: "1255px",
  },
  {
    src: "/figmaAssets/66b9cf188689b891a27c2604-siksilk-logo-b41d10194a-seeklogo-com-pn.png",
    width: "60px",
    height: "47px",
    top: "27px",
    left: "1458px",
  },
  {
    src: "/figmaAssets/65f4ebf6544bd21f10bd3508-flabelus-p-500-png.png",
    width: "115px",
    height: "36px",
    top: "32px",
    left: "1605px",
  },
  {
    src: "/figmaAssets/65f4eac0544bd21f10bc32fc-polin-et-moi-p-500-png.png",
    width: "115px",
    height: "35px",
    top: "33px",
    left: "1780px",
  },
  {
    src: "/figmaAssets/64b9417d5cb3bb2c7fdbab82-hurley-p-500-png.png",
    width: "104px",
    height: "25px",
    top: "38px",
    left: "1960px",
  },
  {
    src: "/figmaAssets/65c5668dca3af1fbf38fcc6e-logo-born-png.png",
    width: "104px",
    height: "13px",
    top: "44px",
    left: "2136px",
  },
  {
    src: "/figmaAssets/63f87f44e202f26e0d8bd1db-logo-lagaam-png.png",
    width: "115px",
    height: "34px",
    top: "33px",
    left: "2305px",
  },
  {
    src: "/figmaAssets/64b940fbf9bafe3cc2a11d4c-renatta-p-500-png.png",
    width: "104px",
    height: "20px",
    top: "40px",
    left: "2486px",
  },
  {
    src: "/figmaAssets/65f4eb054e092775d8aff38f-logo-sepiia-png.png",
    width: "104px",
    height: "38px",
    top: "31px",
    left: "2660px",
  },
  {
    src: "/figmaAssets/63f87f4508c46dd5e2582665-logo-pompeii-png.png",
    width: "115px",
    height: "24px",
    top: "38px",
    left: "2830px",
  },
  {
    src: "/figmaAssets/65f4ee0aba094aade833bf8b-scuffers-png.png",
    width: "80px",
    height: "54px",
    top: "23px",
    left: "3022px",
  },
  {
    src: "/figmaAssets/63f87f45a4d6a735c2bab22b-logo-bimani-png.png",
    width: "115px",
    height: "36px",
    top: "32px",
    left: "3180px",
  },
  {
    src: "/figmaAssets/65c56d9787363f38acf24f51-logo-akala-p-500-png.png",
    width: "90px",
    height: "32px",
    top: "34px",
    left: "3368px",
  },
];

export const HeroSection = (): JSX.Element => {
  const { translations } = useLanguage();

  // Animation variants for text elements
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc] via-[#00a1e6] to-[#022f36]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white/8 transform rotate-45"
            animate={{
              rotate: [45, 225, 405],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-10 w-20 h-20 border-2 border-white/10 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full md:w-1/2 max-w-[691px]">
            <motion.h1 
              className="font-normal text-white text-[50px] leading-[60px] tracking-[-2.00px] mb-6 drop-shadow-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span 
                className="tracking-[-1.00px] inline-block"
                variants={titleVariants}
                custom={0}
              >
                {translations.hero.title.part1}
              </motion.span>
              <motion.span 
                className="font-medium tracking-[-1.00px] inline-block"
                variants={titleVariants}
                custom={1}
              >
                {translations.hero.title.part2}
              </motion.span>
              <motion.span 
                className="tracking-[-1.00px] inline-block"
                variants={titleVariants}
                custom={2}
              >
                {translations.hero.title.part3}
              </motion.span>
              <motion.span 
                className="font-medium tracking-[-1.00px] inline-block"
                variants={titleVariants}
                custom={3}
              >
                {translations.hero.title.part4}
              </motion.span>
              <motion.span 
                className="tracking-[-1.00px] inline-block"
                variants={titleVariants}
                custom={4}
              >
                {translations.hero.title.part5}
              </motion.span>
              <motion.span 
                className="font-medium tracking-[-1.00px] inline-block"
                variants={titleVariants}
                custom={5}
              >
                {translations.hero.title.part6}
              </motion.span>
              <motion.span 
                className="tracking-[-1.00px] inline-block"
                variants={titleVariants}
                custom={6}
              >
                {translations.hero.title.part7}
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-white text-base leading-[22.4px] mb-8 max-w-[449px] drop-shadow-md"
              variants={itemVariants}
            >
              {translations.hero.subtitle}
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="h-[46px] px-6 rounded-[999px] border-2 border-white bg-white/90 backdrop-blur-sm text-[#022f36] font-medium text-sm hover:bg-white transition-all duration-300 shadow-lg"
              >
                {translations.hero.cta}
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="w-full md:w-1/2 max-w-[507px]"
            variants={itemVariants}
          >
            <DynamicImageCarousel />
          </motion.div>
        </motion.div>
      </div>

      {/* Partner logos carousel with enhanced styling */}
      <motion.div 
        className="relative z-10 w-full h-[100px] mt-16 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg" />
        <motion.div 
          className="relative w-[4900px] h-[100px]"
          animate={{ x: [-50, -2450] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {partnerLogos.map((logo, index) =>
            logo.isGroup ? (
              <motion.div
                key={index}
                className="absolute opacity-70 hover:opacity-100 transition-opacity duration-300"
                style={{
                  width: logo.width,
                  height: logo.height,
                  top: logo.top,
                  left: logo.left,
                }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="h-4 overflow-hidden filter brightness-0 invert">
                  <div className="relative w-[115px] h-4">
                    <img
                      className="absolute w-[115px] h-3.5 top-px left-0"
                      alt="Partner logo"
                      src={logo.src}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={index}
                className="absolute opacity-70 hover:opacity-100 bg-cover bg-[50%_50%] filter brightness-0 invert transition-all duration-300"
                style={{
                  width: logo.width,
                  height: logo.height,
                  top: logo.top,
                  left: logo.left,
                  backgroundImage: `url(${logo.src})`,
                }}
                whileHover={{ scale: 1.1 }}
              />
            ),
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};
