import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <main className={'container'}>
      <section>
        <Image
          src={'/footer/footer imgs.png'}
          alt={'promo image 1'}
          width={500}
          height={500}
          className={'relative float-right top-96'}
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
  );
};

export default Footer;
