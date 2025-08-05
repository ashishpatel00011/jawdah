import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface TeamMember {
  id: number;
  image: string;
  name: string;
  Specialization: string;
  text: string;
}

export default function TeamCarousel() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const formData = new FormData();
    formData.append("langType", i18n.language);

    fetch(
      "https://jawdah.yatrasaathi.in/api/fetchDrWithBAImg.php",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setTeam(result.data);
        } else {
          console.error("Failed to fetch doctors data");
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [i18n.language]);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    rtl: isArabic,
    arrows: false,
    centerMode: isMobile,
    centerPadding: isMobile ? '20px' : '0',
    lazyLoad: 'ondemand' as const,
    adaptiveHeight: true
  };

  let sliderRef: any = null;

  return (
    <section className="py-12 bg-gray-50 relative w-full min-h-100">
      <div className="max-w-8xl mx-auto relative">
        {/* Header */}
        <div
          className={`flex md:items-center mb-10 ${isArabic
            ? "md:flex-row flex-col justify-between"
            : "md:flex-row flex-col justify-between px-8"
            }`}
        >
          <div className={`px-9 ${isArabic ? "text-right" : "text-left"}`}>
            <p
              className={`text-[22px] font-medium mb-4 ${isArabic ? "text-[#1ab8b3]" : "text-[#1ab8b3]"
                }`}
            >
              {t("team.meetDentist")}
            </p>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 text-gray-800`}
            >
              {t("team.title")}
            </h2>
            <p
              className={`${isArabic
                ? "text-gray-500 text-[22px]"
                : "text-gray-600 text-[22px]"
                }`}
            >
              {t("team.subtitle")}
            </p>
          </div>
          <Link
            to="/our-doctors"
            className={`flex mt-10 md:items-center gap-1 px-8 font-medium transition-colors duration-200 ${isArabic
              ? "text-[#1ab8b3] hover:text-[#158e8a]"
              : "text-[#1ab8b3] hover:text-[#3c7a78]"
              } group`}
          >
            {t("team.viewAll")}
            <span
              className={`transition-transform duration-200 ${isArabic
                ? "group-hover:-translate-x-1"
                : "group-hover:translate-x-1"
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </span>
          </Link>
        </div>

        {/* Carousel Container with Navigation */}
        <div className="relative">
          {/* Slick Carousel */}
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {team.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="px-3 cursor-pointer"
                onClick={() => navigate(`/team/${member.id}`)}
              >
                <motion.div
                  className="relative w-[260px] sm:w-[280px] md:w-[360px] h-[280px] sm:h-[450px] md:h-[540px] overflow-hidden rounded-2xl shadow-xl mx-auto group"
                >
                  <img
                    src={`https://jawdah.yatrasaathi.in/api/uploads/${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700"
                  />

                  {/* Overlay content */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-auto z-20"
                    initial={{ y: "0%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <div
                      className={`w-full h-full ${isArabic
                        ? "bg-gradient-to-t from-white/100 via-white/80 to-transparent"
                        : "bg-gradient-to-t from-white/100 via-white/80 to-transparent"
                        } backdrop-blur-md p-4 sm:p-6 rounded-t-2xl`}
                    >
                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="w-full text-center"
                      >
                        <h3
                          className={`${isArabic
                            ? "leading-tight text-lg sm:text-xl font-semibold text-gray-800"
                            : "leading-tight text-xl sm:text-2xl font-bold text-gray-800"
                            }`}
                        >
                          {member.name}
                        </h3>
                        <p
                          className={`${isArabic
                            ? "text-sm sm:text-base mt-0.5 sm:mt-1 text-[#58cac6]"
                            : "text-base sm:text-lg font-medium mt-1 sm:mt-2 text-[#58cac6]"
                            }`}
                        >
                          {member.Specialization}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </Slider>

          {/* Left Navigation Arrow - Overlapping on top of images */}
          <button
            onClick={() => sliderRef?.slickPrev()}
            className={`absolute ${isArabic ? 'right-4 sm:right-6 md:right-8' : 'left-4 sm:left-6 md:left-8'} top-1/2 -translate-y-1/2 z-30
              w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl
              flex items-center justify-center transition-all duration-300 transform hover:scale-110
              border border-gray-200/50 opacity-80 hover:opacity-100`}
            aria-label={isArabic ? "السابق" : "Previous"}
          >
            {isArabic ? <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              :
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            }

          </button>

          {/* Right Navigation Arrow - Overlapping on top of images */}
          <button
            onClick={() => sliderRef?.slickNext()}
            className={`absolute ${isArabic ? 'left-4 sm:left-6 md:left-8' : 'right-4 sm:right-6 md:right-8'} top-1/2 -translate-y-1/2 z-30
              w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl
              flex items-center justify-center transition-all duration-300 transform hover:scale-110
              border border-gray-200/50 opacity-80 hover:opacity-100`}
            aria-label={isArabic ? "التالي" : "Next"}
          >
            {isArabic ? <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              : <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />

            }

          </button>
        </div>

        {/* Bottom CTA Button - matching the image style */}
        {/* <div className="flex justify-center mt-12">
          <Link
            to="/our-doctors"
            className="bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:from-[#ffed4e] hover:to-[#ffd700] 
              text-gray-800 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl 
              transition-all duration-300 transform hover:scale-105 text-lg"
          >
            {t("team.viewAll")}
          </Link>
        </div> */}
      </div>
    </section>
  );
}