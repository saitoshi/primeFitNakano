'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';
import { LoadingWheel } from '../_components/ConditionalRelated/LoadingWheel';
import { setToken, verifyToken } from '../_utils/assistFunctions/userFunctions';
import { IUser } from '../_utils/type';

export default function Login() {
  const [email, setEmail] = useState<IUser['email']>('');
  const [password, setPassword] = useState<IUser['password']>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] =
    useState<string>('エラーが発生いたしました。');
  const router = useRouter();
  useEffect(() => {
    const verify = async () => {
      const response = await verifyToken();
      await setIsLoading(false);
      if (!response) {
        await router.push('/login');
      } else {
        await router.push('/dashboard');
      }
    };
    verify();
  }, []);
  const loginUser = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch('/api/login', {
        body: JSON.stringify({ email, password }),
        method: 'POST',
      });
      const userData = await res.json();
      if (userData['status'] == 404) {
        setErrorMsg(
          'こちらのメールアドレスのユーザーさんが登録されておりません。',
        );
        setIsError(true);
      } else if (userData['status'] == 405) {
        setErrorMsg('入力されたパスワードが正しくありません。');
        setIsError(true);
      } else if (userData['status'] == 200) {
        await setToken(userData['token']);
        await setIsLoading(false);
        await router.push('/dashboard');
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingWheel />;
  }
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>LOGIN</p>
          <p className='mainHeader'>管理画面ログイン</p>
        </h2>
        <form id='loginForm' onSubmit={loginUser}>
          <label htmlFor='email' className='formHeader'>
            email
          </label>
          <br />
          <input
            type='text'
            id='email'
            name='email'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => setEmail(e.target.value)}></input>
          <br />
          <label htmlFor='password' className='formHeader'>
            パスワード
          </label>
          <br />
          <input
            type='password'
            id='password'
            name='password'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => setPassword(e.target.value)}></input>
          <br />
          <div style={{ textAlign: 'center' }}>
            <button type='submit' className='loginSubmit'>
              Submit
            </button>
          </div>
          {isError ? <span className='errorMsg'>{errorMsg}</span> : <></>}
        </form>
      </div>
    </div>
  );
}
