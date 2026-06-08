"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "motion/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./service-carousel.css";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type ServiceItem = {
  number: string;
  title: string;
  body: string;
  accent: string;
  image: { src: string; alt: string };
};

type ServiceCarouselProps = {
  services: ServiceItem[];
};

/* ─── Overlay constants (from parent section) ───────────────────────────────── */

const IMG_OVERLAY =
  "linear-gradient(to top, rgba(70,30,45,0.82) 0%, rgba(70,30,45,0.28) 50%, rgba(70,30,45,0.06) 100%)";

/* ─── Individual slide card ─────────────────────────────────────────────────── */

const SlideCard = ({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{
      duration: 0.6,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="service-slide-card group "
  >
    {/* Photo — fills the entire card */}
    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05] ">
      <img
        src={service.image.src}
        alt={service.image.alt}
        className="block w-full h-full object-cover object-center"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>

    {/* Gradient overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: IMG_OVERLAY }}
    />

    {/* Bottom gradient scrim for text readability */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(76,39,51,0.7) 0%, rgba(76,39,51,0.5) 32%, rgba(76,39,51,0.1) 58%, transparent 20%)",
      }}
    />

    {/* Number watermark — top-right */}
    <div
      className="absolute top-4 right-5 font-sans font-black leading-none select-none"
      style={{
        color: "rgba(244,222,191,0.07)",
        fontSize: "4.5rem",
        letterSpacing: "-0.04em",
      }}
    >
      {service.number}
    </div>

    {/* Hover glow line — bottom edge */}
    <div
      className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"
      style={{
        background: "linear-gradient(90deg, #E86240, transparent)",
      }}
    />

    {/* Text content — overlaid at the bottom */}
    <div
      className="absolute bottom-0 left-0 right-0 flex flex-col gap-3"
      style={{ padding: "clamp(1.25rem, 3vw, 1.75rem)" }}
    >
      <h3
        className="font-sans font-bold leading-tight"
        style={{
          color: "#F4DEBF",
          fontSize: "clamp(1.15rem, 2vw, 1.6rem)",
        }}
      >
        {service.title}
      </h3>

      <div
        className="w-8 h-px"
        style={{ background: "rgba(232,98,64,0.55)" }}
      />

      <p
        className="font-satoshi font-medium leading-relaxed"
        style={{
          color: "rgba(244,222,191,0.72)",
          fontSize: "clamp(0.83rem, 1.4vw, 0.93rem)",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }}
      >
        {service.body}
      </p>
    </div>

    {/* Hover border */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ border: "1px solid rgba(232,98,64,0.32)" }}
    />
  </motion.div>
);

/* ─── Main carousel component ───────────────────────────────────────────────── */

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveIndex(swiper.realIndex);
  }, []);

  const goNext = useCallback(() => swiperRef.current?.slideNext(), []);
  const goPrev = useCallback(() => swiperRef.current?.slidePrev(), []);

  return (
    <div ref={containerRef} className="service-carousel-container">
      {/* ── Navigation row ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="service-carousel-nav"
      >
        {/* Left — subtle label */}
        <div className="service-carousel-counter">
          <span className="service-carousel-counter-current">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="service-carousel-counter-sep">/</span>
          <span className="service-carousel-counter-total">
            {String(services.length).padStart(2, "0")}
          </span>
        </div>

        {/* Right — arrow buttons */}
        <div className="service-carousel-arrows">
          <button
            onClick={goPrev}
            disabled={isBeginning}
            className="service-carousel-arrow"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            onClick={goNext}
            disabled={isEnd}
            className="service-carousel-arrow"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </motion.div>

      {/* ── Swiper ─────────────────────────────────────────────────────────── */}
      <Swiper
        modules={[Navigation, Pagination, A11y, FreeMode]}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        onSlideChange={handleSlideChange}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        spaceBetween={20}
        slidesPerView={1.15}
        grabCursor
        freeMode={{
          enabled: true,
          momentumRatio: 0.35,
          momentumVelocityRatio: 0.5,
        }}
        pagination={{
          clickable: true,
          el: ".service-carousel-pagination",
          bulletClass: "service-carousel-bullet",
          bulletActiveClass: "service-carousel-bullet-active",
        }}
        breakpoints={{
          480: {
            slidesPerView: 1.35,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1.8,
            spaceBetween: 22,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 2.8,
            spaceBetween: 24,
            freeMode: {
              enabled: true,
              momentumRatio: 0.25,
              momentumVelocityRatio: 0.4,
            },
          },
          1280: {
            slidesPerView: 3.6,
            spaceBetween: 28,
            freeMode: {
              enabled: true,
              momentumRatio: 0.2,
              momentumVelocityRatio: 0.35,
            },
          },
          1536: {
            slidesPerView: 4.3,
            spaceBetween: 32,
            freeMode: {
              enabled: true,
              momentumRatio: 0.2,
              momentumVelocityRatio: 0.35,
            },
          },
        }}
        a11y={{
          prevSlideMessage: "Previous service",
          nextSlideMessage: "Next service",
          slideLabelMessage: "Service {{index}} of {{slidesLength}}",
        }}
        className="service-carousel-swiper"
      >
        {services.map((service, i) => (
          <SwiperSlide key={service.number} className="service-carousel-slide max-w-lg">
            <SlideCard service={service} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Pagination dots ────────────────────────────────────────────────── */}
      <div className="service-carousel-pagination-wrapper">
        <div className="service-carousel-pagination" />
      </div>
    </div>
  );
}
