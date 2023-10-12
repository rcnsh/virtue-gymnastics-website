import Link from 'next/link';
import Image from 'next/image';
import {
  BiLogoFacebook,
  BiLogoYoutube,
  BiLogoInstagram,
  BiLogoWhatsapp,
} from 'react-icons/bi';

const Footer = () => {
  return (
    <main className={'w-[100vw] bottom-0'}>
      <section className={'backgroundTexture'}>
        <br />
        <br />
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
                  <BiLogoInstagram
                    className={'border-2 border-white w-8 h-8'}
                  />
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
      </section>
    </main>
  );
};

export default Footer;
