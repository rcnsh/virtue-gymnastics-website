import { NextPage } from 'next';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LineBreaks from '@/components/line-breaks';
import Link from 'next/link';
import InstagramSection from '@/components/InstagramSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { FooterEmailForm } from '@/components/footer/footer-email-form';

const Index: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>Virtue Movement - We believe in movement for all</title>
          <meta name="description" content="Virtue Movement" />
        </Head>
        <div className={styles.child}>
          <h1 className={styles.title}>Virtue</h1>
          <h1 className={styles.title}>Movement Co.</h1>
          <div className={styles.glow} />
        </div>
      </div>
      <div className={styles.homeButtons}>
        <Link href={'/students'}>
          <motion.button
            className={styles.buttonJoin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JOIN THE FAMILY
          </motion.button>
        </Link>
        <Link href={'/calendar'}>
          <motion.button
            className={styles.buttonTimetable}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TIMETABLE
          </motion.button>
        </Link>
      </div>

      <div>
        <motion.img
          src={'/home/arrow.webp'}
          alt={''}
          width={200}
          height={200}
          className={styles.arrow}
          animate={{ x: [0, 20, 0], offset: 1, y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.img
          src={'/home/other arrow.webp'}
          alt={''}
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
          src={'/home/double arrow.webp'}
          alt={''}
          width={30}
          height={30}
          className={styles.doublearrow}
          animate={{ x: [0, 50, 0], offset: 0.5 }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <Image
          src={'/home/wave 1.webp'}
          alt={''}
          width={100}
          height={100}
          className={styles.wave1}
        />
        <Image
          src={'/home/wave 2.webp'}
          alt={''}
          width={200}
          height={200}
          className={styles.wave2}
        />
      </div>
      <br />
      <br />
      <div>
        <motion.img
          src={'/home/BELIEVE IN MOVEMENT.webp'}
          alt={''}
          width={200}
          height={200}
          className={styles.believeInMovement}
          animate={{
            rotate: [360, 0],
          }}
          transition={{ repeat: Infinity, duration: 20 }}
        />
      </div>
      <div className={'container'}>
        <Image
          src="/home/homeImage.webp"
          alt=""
          width={3000}
          height={3397}
          className={styles.homeImage}
        />
      </div>
      <LineBreaks />
      <div>
        <div className={'overflow-hidden'}>
          <Image
            src={'/home/dots.webp'}
            className={styles.dots1}
            alt={''}
            width={200}
            height={200}
          />
          <h2 className={styles.getToKnowUs}>GET TO KNOW US</h2>
          <Image
            src={'/home/dots.webp'}
            className={styles.dots2}
            alt={''}
            width={200}
            height={200}
          />
        </div>
        <h5 className={styles.textGetToKnowUs}>
          Virtue aims to provide opportunities for all! Our members will
          progress to reach their highest individual standard, in a fun safe,
          protective environment. Our mission is to increase all round strength,
          co ordination, agility, balance and fitness whilst enjoying every
          second. We believe every one can achieve, which in turn fosters
          confidence, self-discipline and motivation. We believe in movement for
          all!
        </h5>
        <Image
          src={'/home/double arrow bold.webp'}
          alt={''}
          width={50}
          height={200}
          className={styles.doubleArrowBold}
        />
        <div className={styles.glow2}></div>
      </div>
      <InstagramSection />
      <TestimonialsSection />
      <main className={'container'}>
        <section>
          <Image
            src={'/footer/footer imgs.webp'}
            alt={'promo image 1'}
            width={600}
            height={600}
            className={'relative float-right bottom-24'}
          />
          <h1 className={'font-bold text-6xl'}>Get In Touch</h1>
          <br />
          <h5 className={'font-bold text-xl whitespace-pre-line'}>
            Do you need movement?
          </h5>
          <h5 className={'font-bold text-xl whitespace-pre-line'}>
            Do you have a child that can’t sit still?
          </h5>
          <h5 className={'font-bold text-xl whitespace-pre-line'}>
            Need to get in touch with us?
          </h5>
          <h5 className={'font-bold text-xl whitespace-pre-line'}>
            Shoot us a msg &gt; &gt; &gt;
          </h5>
        </section>
        <br />
        <section>
          <h5>
            <b>Email:</b>
            <Link
              href={'mailto:office@virtuegymnastics.co.uk'}
              className={'underline'}
            >
              {' '}
              office@virtuegymnastics.co.uk
            </Link>
          </h5>
          <h5>
            <b>Phone:</b> <Link href={'tel:07715306363'}>07715306363</Link>
          </h5>
          <h5>
            <b>Address:</b> 7 Sterling way, RG30 6HW
          </h5>
        </section>
        <section>
          <div className={styles.glow}></div>
        </section>
      </main>
      <section>
        <div className={'flex w-[100vw]'}>
          <div className={'centre-inner'}>
            <h5 className={'text-5xl m-auto w-1/3'}>LETS CHAT</h5>
            <FooterEmailForm />
          </div>
          <Image
            src={'/home/BELIEVE IN MOVEMENT.webp'}
            alt={''}
            width={200}
            height={200}
            className={
              'relative float-right top-[5rem] right-[5rem] w-[8rem] h-[8rem]'
            }
          />
        </div>
      </section>
      <section>
        <div className={'flex w-[100vw]'}>
          <Image
            src={'/footer/bottom card.webp'}
            alt={'policies card'}
            width={600}
            height={600}
            className={'w-[75vw] my-20 relative overflow-hidden m-auto'}
          />
        </div>
      </section>
    </>
  );
};

export default Index;
