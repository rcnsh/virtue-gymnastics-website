import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FooterEmailForm } from '@/components/footer/footer-email-form';

const Footer = () => {
  return (
    <main>
      <main className={'container'}>
        <section>
          <Image
            src={'/footer/footer imgs.png'}
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
            <Link href={'mailto:office@virtuegymnastics.co.uk'}>
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
      <main>
        <section>
          <div className={'grid centre'}>
            <h5 className={'text-5xl centre-inner'}>LETS CHAT</h5>
          </div>
        </section>
      </main>
    </main>
  );
};

export default Footer;
