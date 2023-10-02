import { SignUp } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <>
      <br />
      <br />
      <div className={'flex justify-center'}>
        <h1 className={'text-5xl'}>Sign In</h1>
      </div>
      <br />
      <div className={'flex justify-center'}>
        <SignUp />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default SignInPage;
