import { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import testimonialStyles from "@/styles/testimonialsCarousel.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import LineBreaks from "@/components/line-breaks";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
const Index: NextPage = () => {
  const [emblaRef] = useEmblaCarousel({
    startIndex: 2,
  });
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <div>
          <Head>
            <title>virtue-gymnastics</title>
            <meta name="description" content="Virtue Gymnastics" />
          </Head>
          <div className={styles.child}>
            <div>
              <h1 className={styles.title1}>Virtue</h1>

              <h1 className={styles.title2}>Movement Co.</h1>
            </div>
            <div className={styles.glow}></div>
          </div>
          <div className={styles.homeButtons}>
            <motion.button
              className={styles.buttonJoin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              JOIN THE FAMILY
            </motion.button>
            <motion.button
              className={styles.buttonTimetable}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              TIMETABLE
            </motion.button>
          </div>

          <div>
            <motion.img
              src={"/home/arrow.png"}
              alt={""}
              width={200}
              height={200}
              className={styles.arrow}
              animate={{ x: [0, 20, 0], offset: 1, y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 10 }}
            />
            <motion.img
              src={"/home/other arrow.png"}
              alt={""}
              width={75}
              height={75}
              className={styles.otherarrow}
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
                speed: 0.5,
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.img
              src={"/home/double arrow.png"}
              alt={""}
              width={30}
              height={30}
              className={styles.doublearrow}
              animate={{ x: [0, 50, 0], offset: 0.5 }}
              transition={{ repeat: Infinity, duration: 10 }}
            />
            <motion.img
              src={"/home/wave 1.png"}
              alt={""}
              width={100}
              height={100}
              className={styles.wave1}
            />
            <motion.img
              src={"/home/wave 2.png"}
              alt={""}
              width={200}
              height={200}
              className={styles.wave2}
            />
          </div>

          <div>
            <motion.img
              src={"/home/BELIEVE IN MOVEMENT.png"}
              alt={""}
              width={200}
              height={200}
              className={styles.believeInMovement}
              animate={{
                rotate: [360, 0],
              }}
              transition={{ repeat: Infinity, duration: 20 }}
            />
          </div>
          <div className={styles.homeImage}>
            <Image
              src="/home/homeImage.png"
              alt=""
              width={3000}
              height={3397}
            />
          </div>
          <LineBreaks />
          <div>
            <div className={"overflow-hidden"}>
              <motion.img
                src={"/home/dots.png"}
                className={styles.dots1}
                alt={""}
                width={200}
              />
              <h2 className={styles.getToKnowUs}>GET TO KNOW US</h2>
              <motion.img
                src={"/home/dots.png"}
                className={styles.dots2}
                alt={""}
                width={200}
              />
            </div>
            <h5 className={styles.textGetToKnowUs}>
              Virtue aims to provide opportunities for all! Our members will
              progress to reach their highest individual standard, in a fun
              safe, protective environment. Our mission is to increase all round
              strength, co ordination, agility, balance and fitness whilst
              enjoying every second. We believe every one can achieve, which in
              turn fosters confidence, self-discipline and motivation. We
              believe in movement for all!
            </h5>
            <motion.img
              src={"/home/double arrow bold.png"}
              alt={""}
              width={50}
              className={styles.doubleArrowBold}
            />
            <div className={styles.glow2}></div>
          </div>
          <div className={"overflow-hidden z-10"}>
            <h1 className={styles.instagram}>INSTAGRAM</h1>
            <h1
              className={
                "text-6xl bottom-80 left-28 font-bold relative unselectable"
              }
            >
              INSTAGRAM
            </h1>
            <motion.img
              src={"/home/instagram arrow.png"}
              className={styles.instagramArrow}
              alt={""}
              width={100}
            />
            <motion.button
              className={styles.buttonFollow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FOLLOW
            </motion.button>
          </div>
          <div className={"container"}>
            <div className={"flex flex-wrap justify-center"}>
              <Image
                src={"/home/promo image 3.png"}
                alt={""}
                width={400}
                height={400}
                className={`${styles.instagram2} ${styles.promoImages}`}
              />
              <Image
                src={"/home/promo image 1.png"}
                alt={""}
                width={400}
                height={400}
                className={`${styles.instagram1} ${styles.promoImages}`}
              />
              <Image
                src={"/home/promo image 2.png"}
                alt={""}
                width={400}
                height={400}
                className={`${styles.instagram3} ${styles.promoImages}`}
              />
            </div>
          </div>
          <div className={"relative bottom-52"}>
            <Image
              src={"/home/banner.png"}
              alt={""}
              width={3000}
              height={3397}
              className={styles.banner}
            />
          </div>
        </div>
        <div>
          <div
            className={
              "w-[100%] text-center text-[80px] xl:text-[100px] 2xl:text-[120px] uppercase leading-none unselectable"
            }
          >
            <h1 className={styles.testimonialsTitle}>TESTIMONIALS</h1>
          </div>
          <h1
            className={
              "text-7xl bottom-60 left-28 font-bold relative overflow-hidden unselectable"
            }
          >
            TESTIMONIALS
          </h1>
          <div className={styles.leaveAReview}>
            <Link
              href={
                "https://www.google.com/maps/place/Virtue+movement+co./@51.4620734,-1.0170551,17z/data=!4m8!3m7!1s0x48769bbc0776c789:0x26f3bea60b3487ff!8m2!3d51.4620734!4d-1.0144748!9m1!1b1!16s%2Fg%2F11bxfyzhx5"
              }
            >
              <button
                className={
                  "bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 px-5 rounded bottom-60 relative border-white border-2 hover:border-gray-800 overflow-hidden"
                }
              >
                Leave a review
              </button>
            </Link>
          </div>
          <div className={styles.viewAllReviews}>
            <Link
              href={
                "https://www.google.com/maps/place/Virtue+movement+co./@51.4620734,-1.0170551,17z/data=!4m8!3m7!1s0x48769bbc0776c789:0x26f3bea60b3487ff!8m2!3d51.4620734!4d-1.0144748!9m1!1b1!16s%2Fg%2F11bxfyzhx5"
              }
            >
              <button
                className={
                  "bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 px-5 rounded bottom-60 relative border-white border-2 hover:border-gray-800 overflow-hidden"
                }
              >
                View All Reviews
              </button>
            </Link>
          </div>
          <div className={"relative bottom-64 overflow-hidden"}>
            <div className={"flex align-middle justify-center"}>
              <div className={testimonialStyles.embla} ref={emblaRef}>
                <div className={testimonialStyles.embla__container}>
                  <Image
                    className={testimonialStyles.embla__slide}
                    alt={"testimonial1"}
                    src={"/home/testimonials/testimonial1.png"}
                    width={1000}
                    height={1000}
                  />
                  <Image
                    className={testimonialStyles.embla__slide}
                    alt={"testimonial2"}
                    src={"/home/testimonials/testimonial2.png"}
                    width={1000}
                    height={1000}
                  />
                  <Image
                    className={testimonialStyles.embla__slide}
                    alt={"testimonial3"}
                    src={"/home/testimonials/testimonial3.png"}
                    width={1000}
                    height={1000}
                  />
                  <Image
                    className={testimonialStyles.embla__slide}
                    alt={"testimonial4"}
                    src={"/home/testimonials/testimonial4.png"}
                    width={1000}
                    height={1000}
                  />
                  <Image
                    className={testimonialStyles.embla__slide}
                    alt={"testimonial5"}
                    src={"/home/testimonials/testimonial5.png"}
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Index;

// TODO reminder to use https://www.embla-carousel.com/get-started/react/
