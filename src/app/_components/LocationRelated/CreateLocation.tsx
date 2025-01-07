'use client';
import { useState } from 'react';
import { LoadingWheel } from '../ConditionalRelated/LoadingWheel';
import { ILocation } from '@/app/_utils/type';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/_utils/assistFunctions/userFunctions';

export const CreateLocationForm = () => {
  const router = useRouter();
  const [name, setName] = useState<ILocation['name']>();
  const [access, setAccess] = useState<ILocation['access']>();
  const [address, setAddress] = useState<ILocation['address']>();
  const [phoneNumber, setPhone] = useState<ILocation['phoneNumber']>();
  const [hours, setHours] = useState<ILocation['hours']>();
  const [description, setDesc] = useState<ILocation['description']>();
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('エラーが発生しました。');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitLocation = async (e: any) => {
    try {
      await e.preventDefault();
      await setLoad(true);
      const token = await getToken();
      if (token == null || token == undefined) {
        await setError(true);
        await router.push('/login');
      }
      const locationResponse = await fetch(`/api/location/`, {
        headers: { Authorization: `Bearer: ${token}` },
        method: 'POST',
        body: JSON.stringify({
          name,
          phoneNumber,
          address,
          access,
          hours,
          description,
        }),
      });
      const locationData = await locationResponse.json();
      if (locationData['status'] === 403) {
        await setError(true);
        await setErrMsg('承認エラーが発生しました。再ログインしてください。');
        await router.push('/login');
      } else if (locationData['status'] !== 201) {
        await setError(true);
      }
      if (locationData['status'] === 201) {
        await router.push('/success');
      }
    } catch (error) {
      await console.error(error);
    } finally {
      await setLoad(false);
    }
  };
  if (load) {
    return (
      <>
        <LoadingWheel />
      </>
    );
  }
  return (
    <>
      <div id='locationForm' className='formArea'>
        <label htmlFor='name' className='formHeader'>
          店舗名
        </label>
        <input
          type='name'
          id='name'
          placeholder='店舗名の入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setName(e.target.value);
          }}></input>
        <label htmlFor='name' className='formHeader'>
          店舗住所
        </label>
        <input
          type='name'
          id='name'
          placeholder='店舗住所の入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setAddress(e.target.value);
          }}></input>
        <label htmlFor='name' className='formHeader'>
          営業時間
        </label>
        <input
          type='hours'
          id='hours'
          placeholder='営業の入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setHours(e.target.value);
          }}></input>
        <label htmlFor='name' className='formHeader'>
          電話番号
        </label>
        <input
          type='hours'
          id='hours'
          placeholder='電話番号の入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setPhone(e.target.value);
          }}></input>
        <label htmlFor='name' className='formHeader'>
          アクセス
        </label>
        <input
          type='access'
          id='access'
          placeholder='アクセスの入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setAccess(e.target.value);
          }}></input>
        <label htmlFor='name' className='formHeader'>
          店舗概要
        </label>
        <textarea
          name='description'
          placeholder='サービスの概要の入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setDesc(e.target.value);
          }}></textarea>
        <div style={{ textAlign: 'center' }}>
          <button
            id='submitButton'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              submitLocation(e);
            }}>
            店舗追加
          </button>
        </div>
        {error ? <span className='errorMsg'>{errMsg}</span> : <></>}
      </div>
    </>
  );
};
