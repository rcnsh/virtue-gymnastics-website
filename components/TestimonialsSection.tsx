import Image from 'next/image';
import styles from '@/styles/TestimonialsSection.module.css';
import testimonialStyles from '@/styles/testimonialsCarousel.module.css';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

const TestimonialsSection = () => {
  const [emblaRef] = useEmblaCarousel({
    startIndex: 2,
  });
  return (
    <section>
      <div
        className={
          'w-[100%] text-center text-[80px] xl:text-[100px] 2xl:text-[120px] uppercase leading-none unselectable'
        }
      >
        <h1 className={styles.testimonialsTitle}>TESTIMONIALS</h1>
      </div>
      <h1
        className={
          'text-7xl bottom-60 left-28 font-bold relative overflow-hidden unselectable'
        }
      >
        TESTIMONIALS
      </h1>
      <div className={styles.leaveAReview}>
        <Link
          href={
            'https://www.google.com/maps/place/Virtue+movement+co./@51.4620734,-1.0170551,17z/data=!4m8!3m7!1s0x48769bbc0776c789:0x26f3bea60b3487ff!8m2!3d51.4620734!4d-1.0144748!9m1!1b1!16s%2Fg%2F11bxfyzhx5'
          }
        >
          <button
            className={
              'bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 px-5 rounded bottom-60 relative border-white border-2 hover:border-gray-800 overflow-hidden'
            }
          >
            Leave a review
          </button>
        </Link>
      </div>
      <div className={styles.viewAllReviews}>
        <Link
          href={
            'https://www.google.com/maps/place/Virtue+movement+co./@51.4620734,-1.0170551,17z/data=!4m8!3m7!1s0x48769bbc0776c789:0x26f3bea60b3487ff!8m2!3d51.4620734!4d-1.0144748!9m1!1b1!16s%2Fg%2F11bxfyzhx5'
          }
        >
          <button
            className={
              'bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 px-5 rounded bottom-60 relative border-white border-2 hover:border-gray-800 overflow-hidden'
            }
          >
            View All Reviews
          </button>
        </Link>
      </div>
      <section className={'relative bottom-64 overflow-hidden'}>
        <div className={'flex align-middle justify-center'}>
          <div className={testimonialStyles.embla} ref={emblaRef}>
            <div className={testimonialStyles.embla__container}>
              <Image
                className={testimonialStyles.embla__slide}
                alt={'testimonial1'}
                src={'/home/testimonials/testimonial1.png'}
                width={1000}
                height={1000}
              />
              <Image
                className={testimonialStyles.embla__slide}
                alt={'testimonial2'}
                src={'/home/testimonials/testimonial2.png'}
                width={1000}
                height={1000}
              />
              <Image
                className={testimonialStyles.embla__slide}
                alt={'testimonial3'}
                src={'/home/testimonials/testimonial3.png'}
                width={1000}
                height={1000}
              />
              <Image
                className={testimonialStyles.embla__slide}
                alt={'testimonial4'}
                src={'/home/testimonials/testimonial4.png'}
                width={1000}
                height={1000}
              />
              <Image
                className={testimonialStyles.embla__slide}
                alt={'testimonial5'}
                src={'/home/testimonials/testimonial5.png'}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TestimonialsSection;
