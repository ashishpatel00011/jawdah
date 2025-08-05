import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BeforeAfterSlider from "./BeforeAfterSlider1";
import { useTranslation } from "react-i18next";

interface ImagePair {
  beforeImg: string;
  afterImg: string;
}

interface Doctor {
  name: string;
  image: string;
  Specialization: string;
  classification: string;
  year: string;
  description: string;
  working: string;
  Branch: string;
  PhD: string;
  Master: string;
  Bachelor: string;
  experience: string;
  courses: string;
  Languages: string;
  beforeAfterImages: ImagePair[];
}

function TeamDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const langtype = queryParams.get("langtype") || "en";

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("langType", i18n.language);

    fetch(
      "https://jawdah.yatrasaathi.in/api/viewDoctorById.php",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setDoctor(data.data);
          setError("");
        } else {
          setError("Member not found");
          setDoctor(null);
        }
      })
      .catch(() => {
        setError("Failed to fetch data");
        setDoctor(null);
      });
  }, [id, i18n.language]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!doctor) return <div>Loading...</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    draggable: false,
    swipe: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          draggable: true,
        },
      },
    ],
  };
  const cleanText = (text: string) =>
    text?.replace(/\\\\+/g, "\\").replace(/\\'/g, "'").replace(/\\"/g, '"');

  function getRepeatedImagePairs(imagePairs: ImagePair[], minLength = 6) {
    const repeatedPairs: ImagePair[] = [];
    while (repeatedPairs.length < minLength) {
      repeatedPairs.push(...imagePairs);
    }
    return repeatedPairs.slice(0, minLength);
  }

  return (
    <div
      className={`min-h-screen bg-black py-6 px-4 md:px-6 relative ${langtype === "ar" ? "rtl" : "ltr"
        }`}
    >
      <div
        className={`w-full mx-auto px-3 md:px-6 rounded-xl shadow-lg text-white flex gap-4 md:gap-8 ${isArabic ? "md:flex-row-reverse flex-col" : "md:flex-row flex-col"
          }`}
      >
        {/* Left: Smaller sticky image */}
        <div className="w-full md:w-2/5 xl:w-2/5 lg:sticky top-10 self-start">
          <img
            src={`https://jawdah.yatrasaathi.in/api/uploads/${doctor.image}`}
            alt={doctor.name}
            className="w-full lg:h-[90vh] object-cover rounded-lg"
          />
        </div>

        {/* Right: Centered and scrollable basic info */}
        <div className="w-full md:w-3/5 xl:w-3/5 flex flex-col gap-2 overflow-y-auto">

          <div className="mb-1 md:mb-3">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {doctor.name}
            </h3>
            <p className="text-lg sm:text-xl text-[#1ab8b3] font-medium mb-3">
              {cleanText(doctor.Specialization)}
            </p>

            {doctor.working && (
              <p className="text-base md:text-lg text-gray-300 italic mb-4">
                <span className="text-[#1ab8b3]">"</span>
                {doctor.working}
                <span className="text-[#1ab8b3]">"</span>
              </p>
            )}
          </div>

          {doctor.description && (
            <div className="mb-4">
              <p
                style={{ textAlign: isArabic ? "right" : "left" }}
                className="text-base text-gray-300 leading-relaxed"
              >
                {cleanText(doctor.description)}
              </p>
            </div>
          )}


          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 text-white border-b border-gray-700 pb-1">
              {t("drView.education")}
            </h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {doctor.PhD && (
                <li className="text-base md:text-lg text-white">
                  {cleanText(doctor.PhD)}
                </li>
              )}
              {doctor.Master && (
                <li className="text-base md:text-lg text-white">
                  {cleanText(doctor.Master)}
                </li>
              )}
              {doctor.Bachelor && (
                <li className="text-base md:text-lg text-white">
                  {doctor.Bachelor}
                </li>
              )}
            </ul>
          </div>

          {doctor.courses && (
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2 text-white border-b border-gray-700 pb-1">
                {t("drView.certificates")}
              </h2>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {doctor.courses.split('\n').map((course, index) => (
                  <li key={index} className="text-base md:text-lg text-white">
                    {course.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {doctor.Languages && (
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2 text-white border-b border-gray-700 pb-1">
                {t("drView.languages")}
              </h2>
              <p className="text-base md:text-lg text-white mt-2 pl-5">
                {doctor.Languages}
              </p>
            </div>
          )}

          {/* Branch information */}
          {doctor.Branch && (
            <div className="mt-2">
              <p className="text-base text-gray-300">
                {doctor.Branch}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Before/After gallery section */}
      {doctor.beforeAfterImages.some(
        (pair) => pair.beforeImg !== "" && pair.afterImg !== ""
      ) && (
          <div className="container mx-auto mt-10 mb-10">
            <div
              className={`flex ${isArabic ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"
                }`}
            >
              <div className="w-full md:w-1/2 md:p-4">
                <div className="flex flex-col justify-center md:p-4">
                  <h2
                    style={{ textAlign: isArabic ? "right" : "left" }}
                    className="text-2xl sm:text-3xl text-white font-bold mb-3"
                  >
                    {t("drView.smileTransf.title")}
                  </h2>
                  <p
                    style={{ textAlign: isArabic ? "right" : "left" }}
                    className="text-base text-white"
                  >
                    {t("drView.smileTransf.description")}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <Slider {...settings}>
                  {getRepeatedImagePairs(doctor.beforeAfterImages, 6).map(
                    (pair, index) => (
                      <div key={index} className="flex-none transition-transform">
                        <BeforeAfterSlider
                          beforeImg={`https://jawdah.yatrasaathi.in/api/uploads/before/${pair.beforeImg}`}
                          afterImg={`https://jawdah.yatrasaathi.in/api/uploads/after/${pair.afterImg}`}
                        />
                      </div>
                    )
                  )}
                </Slider>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/qualitygallery")}
                className="bg-[#1ab8b3] text-white px-4 py-2 rounded hover:bg-[#159693]"
              >
                {t("drView.viewMore")}
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

export default TeamDetail;