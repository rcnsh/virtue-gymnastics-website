import { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

const Index: NextPage = () => {
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
        <Head>
          <title>virtue-gymnastics</title>
          <meta name="description" content="Virtue Gymnastics" />
        </Head>

        <div>
          <div className={styles.child}>
            <h1 className={styles.title1}>Virtue</h1>
            <h1 className={styles.title2}>Movement Co.</h1>
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
              src={"/arrow.png"}
              alt={""}
              width={200}
              height={200}
              className={styles.arrow}
            />
            <motion.img
              src={"/other arrow.png"}
              alt={""}
              width={75}
              height={75}
              className={styles.otherarrow}
            />
            <motion.img
              src={"/double arrow.png"}
              alt={""}
              width={30}
              height={30}
              className={styles.doublearrow}
            />
            <motion.img
              src={"/wave 1.png"}
              alt={""}
              width={100}
              height={100}
              className={styles.wave1}
            />
            <motion.img
              src={"/wave 2.png"}
              alt={""}
              width={200}
              height={200}
              className={styles.wave2}
            />
          </div>

          <div>
            <motion.img
              src={"/BELIEVE IN MOVEMENT.png"}
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
            <Image src="/homeImage.png" alt="" width={3000} height={3397} />
          </div>
          <br />
        </div>
      </motion.div>
    </>
  );
};

export default Index;
