'use client';
import { useState } from 'react';
import {
  getToken,
  passwordStrength,
} from '@/app/_utils/assistFunctions/userFunctions';
import { LoadingWheel } from '../ConditionalRelated/LoadingWheel';
import { useRouter } from 'next/navigation';
import { IUser } from '@/app/_utils/type';

export const CreateUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState<IUser['email']>();
  const [password, setPassword] = useState<IUser['password']>();
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitUser = async (e: any) => {
    try {
      await e.preventDefault();
      const pwdStrength = await passwordStrength(password);
      if (!pwdStrength) {
        await setError(true);
        await setErrMsg('パスワードが弱すぎます。再入力してください。');
      }
      const token = await getToken();
      if (!token) {
        await setLoad(false);
        await setError(true);
        await setErrMsg('再ログインをしてください');
      }

      const userServer = await fetch('/api/user', {
        headers: { Authorization: `Bearer: ${token}` },
        body: JSON.stringify({ email, password }),
        method: 'POST',
      });
      const userResponse = await userServer.json();
      if (userResponse['status'] === 400 || userResponse['status'] === 403) {
        await setError(true);
        await setErrMsg(userResponse['message']);
      } else if (userResponse['status'] !== 201) {
        await setError(true);
      } else if (userResponse['status'] === 201) {
        await router.push('/success');
      }
    } catch (error) {
      await console.error(error);
      await setError(true);
      const errResponse = await error.json();
      await setErrMsg(errResponse.message);
    } finally {
      await setLoad(false);
    }
  };
  if (load) {
    if (!verified) {
    }
    return (
      <>
        <LoadingWheel />
      </>
    );
  }
  return (
    <>
      <div id='blogForm' className='formArea'>
        <label htmlFor='title' className='formHeader'>
          ユーザーのメールアドレス
        </label>
        <input
          type='title'
          id='title'
          placeholder='ユーザーのメールアドレス'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}></input>
        <label htmlFor='title' className='formHeader'>
          ユーザーのパスワード
        </label>
        <input
          type='password'
          id='password'
          placeholder='ユーザーのパスワード'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}></input>
        <div style={{ textAlign: 'center' }}>
          <button
            id='submitButton'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              submitUser(e);
            }}>
            ユーザー登録
          </button>
        </div>
        {error ? <span className='errorMsg'>{errMsg}</span> : <></>}
      </div>
    </>
  );
};
