import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FooterEmailForm } from '@/components/footer/footer-email-form';
import {
  BiLogoFacebook,
  BiLogoYoutube,
  BiLogoInstagram,
  BiLogoWhatsapp,
} from 'react-icons/bi';

const Footer = () => {
  return (
    <main className={'w-[100vw]'}>
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
      <Image
        src={'/home/scribble.webp'}
        alt={'scribble deco'}
        className={'relative float-right w-[10vw] top-[15rem] right-[35vw]'}
        width={200}
        height={200}
      />
      <section>
        <div className={'flex w-[100vw] justify-evenly align-middle'}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={'/virtue-icon.png'}
            alt={'Virtue Icon'}
            className={'w-[15vw] my-20'}
          />
          <div className={'space-y-2'}>
            <h5 className={'text-3xl'}>QUICK LINKS</h5>
            <Link href={'/events'}>Events/Camps</Link>
            <br />
            <Link href={'/faq'}>FAQs</Link>
            <br />
            <Link href={'/parties'}>Parties</Link>
            <br />
            <Link href={'/about-us'}>About Us</Link>
            <br />
            <Link href={'/member-info'}>Member Info</Link>
            <br />
            <Link href={'/welfare'}>Welfare</Link>
            <br />
            <Link href={'/external-hire'}>External Hire</Link>
            <br />
          </div>
          <div>
            <h5 className={'text-3xl'}>SOCIAL MEDIA LINKS</h5>
            <div className={'flex p-5 space-x-10'}>
              <Link href={'https://www.facebook.com/virtuemovementco'}>
                <BiLogoFacebook className={'border-2 border-white w-8 h-8'} />
              </Link>
              <Link href={'https://instagram.com/virtuemovementco'}>
                <BiLogoInstagram className={'border-2 border-white w-8 h-8'} />
              </Link>
              <Link href={'https://api.whatsapp.com/send?phone=7715306363'}>
                <BiLogoWhatsapp className={'border-2 border-white w-8 h-8'} />
              </Link>
              <Link
                href={
                  'https://www.youtube.com/channel/UCbsY0WKc8xcVGJAq3y_I7Vg'
                }
              >
                <BiLogoYoutube className={'border-2 border-white w-8 h-8'} />
              </Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={'/footer/double wave.webp'}
            alt={'duel wave decoration'}
            className={'w-[15vw] my-20'}
          />
        </div>
      </section>
    </main>
  );
};

export default Footer;
