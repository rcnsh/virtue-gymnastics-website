import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import LineBreaks from "@/components/line-breaks";
const InstagramSection = dynamic(() => import("@/components/InstagramSection"));
const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection"),
  {
    ssr: false,
  },
);

const Index: NextPage = () => {
  return (
    <>
      <motion.main
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
        </div>
        <InstagramSection />
        <TestimonialsSection />
      </motion.main>
    </>
  );
};

export default Index;
