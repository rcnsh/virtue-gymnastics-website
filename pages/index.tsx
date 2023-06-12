import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>virtue-gymnastics</title>
        <meta name="description" content="Virtue Gymnastics" />
      </Head>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div>
        <h1 className={styles.title1}>Virtue</h1>
        <h1 className={styles.title2}>Movement Co.</h1>
        <div className={styles.arrow}>
          <Image
            src={"/arrow-scribble-home.png"}
            alt={""}
            width={100}
            height={100}
          />
        </div>
        <div className={styles.glow}></div>
        <div className={styles.centre}>
          <button className={styles.buttonJoin}>
            <div>JOIN THE FAMILY</div>
          </button>
          <button className={styles.buttonTimetable}>
            <div>TIMETABLE</div>
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Index;
