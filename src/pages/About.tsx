import { motion } from "framer-motion"; 
import Progressbar from "../components/Progressbar"; 
import { useTranslation } from "react-i18next"; 
import ServicesSection from "../components/ServicesSection"; 
// import ServicesSection2 from "../components/ServicesSection2"; 
import MobileLink from "../components/MobileLink"; 
import Book from "../components/Book"; 
import React from "react"; 
 
export default function About() { 
  const { t, i18n } = useTranslation(); 
  const isArabic = i18n.language === 'ar'; 
 
  return ( 
    <div className="relative min-h-screen overflow-hidden"> 
      {/* Hero Section with Responsive Image */}
      <div className="relative overflow-hidden"> 
        <img 
          src="/Images/2.JPG" 
          alt="" 
          className="w-full h-auto object-cover object-center
            /* Responsive image heights */
            min-h-[300px] max-h-[350px]
            sm:min-h-[350px] sm:max-h-[400px]
            md:min-h-[500px] md:max-h-[600px]
            lg:min-h-[400px] lg:max-h-[450px]
            xl:min-h-[400px] xl:max-h-[450px]
          "
        /> 
        <div className="absolute inset-0 bg-black/30 z-10" /> 
 
        {/* Content Container with Responsive Positioning */}
        <div 
          className={` 
            absolute inset-0 z-20 flex flex-col justify-center px-4 
            
            /* Mobile styles (default) */
            items-center text-center
            py-8
            
            /* Small mobile adjustments */
            xs:px-6 xs:py-10
            
            /* Tablet styles */
            sm:px-8 sm:py-12
            
            /* Desktop styles */
            md:px-12 md:py-16
            
            /* Large desktop styles */
            lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-24 2xl:py-28
            
            /* Language-specific alignments for desktop */
            ${isArabic 
              ? "md:text-right md:items-end" 
              : "md:text-left md:items-start"
            }
          `} 
        > 
          {/* Animated Title with Responsive Typography */}
          <motion.h1 
            initial={{ opacity: 0, x: isArabic ? 100 : -100, scale: 0.9 }} 
            animate={{ opacity: 1, x: 0, scale: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }} 
            className="
              /* Mobile typography */
              text-2xl leading-tight font-bold text-white mb-6
              
              /* Small mobile */
              xs:text-3xl xs:leading-tight xs:mb-8
              
              /* Tablet */
              sm:text-4xl sm:leading-tight sm:mb-8
              
              /* Desktop */
              md:text-5xl md:leading-tight md:mb-8
              
              /* Large desktop */
              lg:text-6xl lg:leading-tight lg:mb-10
              
              /* Extra large desktop */
              xl:text-7xl xl:leading-tight xl:mb-12
              
              /* Ultra wide */
              2xl:text-8xl 2xl:leading-tight 2xl:mb-14
            " 
          > 
            <span className="block">
              {t("about.hero.title").split('\n').map((line, index, array) => ( 
                <React.Fragment key={index}> 
                  {line} 
                  {index < array.length - 1 && <br />} 
                </React.Fragment> 
              ))} 
            </span>
          </motion.h1> 
 
          {/* Responsive CTA Button */}
          <motion.button 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            onClick={() => { 
              document 
                .getElementById("ourStory") 
                ?.scrollIntoView({ behavior: "smooth" }); 
            }} 
            className="
              bg-gradient-custom text-white rounded-md font-semibold
              transition-all duration-300 ease-in-out
              hover:cursor-pointer hover:scale-105 hover:shadow-lg
              active:scale-95
              
              /* Mobile button */
              px-6 py-3 text-sm min-w-[120px]
              
              /* Small mobile */
              xs:px-7 xs:py-3.5 xs:text-base xs:min-w-[140px]
              
              /* Tablet */
              sm:px-8 sm:py-4 sm:text-base sm:min-w-[160px]
              
              /* Desktop */
              md:px-10 md:py-4 md:text-lg md:min-w-[180px]
              
              /* Large desktop */
              lg:px-12 lg:py-5 lg:text-lg lg:min-w-[200px]
              
              /* Extra large desktop */
              xl:px-14 xl:py-6 xl:text-xl xl:min-w-[220px]
              
              /* Ultra wide */
              2xl:px-16 2xl:py-7 2xl:text-2xl 2xl:min-w-[240px]
            " 
          > 
            {t("about.hero.contactButton")} 
          </motion.button> 
        </div> 
      </div> 
 
      {/* Other Components with Responsive Spacing */}
        <Progressbar /> 
        <ServicesSection /> 
        {/* <ServicesSection2 /> */} 
        <Book /> 
        <MobileLink /> 
    </div> 
  ); 
}