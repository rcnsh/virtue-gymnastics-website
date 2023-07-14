import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/styles/InstagramSection.module.css';

const InstagramSection = () => {
  return (
    <section>
      <div className={'overflow-hidden z-10'}>
        <h1 className={styles.instagram}>INSTAGRAM</h1>
        <h1
          className={
            'text-6xl bottom-80 left-28 font-bold relative unselectable'
          }
        >
          INSTAGRAM
        </h1>
        <motion.img
          src={'/home/instagram arrow.png'}
          className={styles.instagramArrow}
          alt={''}
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
      <div className={'container unselectable'}>
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.instagram2}>
            <Image
              src={'/home/promo image 3.png'}
              alt={''}
              width={400}
              height={400}
            />
          </div>
          <div className={styles.instagram1}>
            <Image
              src={'/home/promo image 1.png'}
              alt={''}
              width={400}
              height={400}
            />
          </div>
          <div className={styles.instagram3}>
            <Image
              src={'/home/promo image 2.png'}
              alt={''}
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className={'relative bottom-52'}>
        <Image
          src={'/home/banner.png'}
          alt={''}
          width={3000}
          height={3397}
          className={styles.banner}
        />
      </div>
    </section>
  );
};

export default InstagramSection;
