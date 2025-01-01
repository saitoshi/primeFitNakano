'use client';
import { useState, useEffect } from 'react';
import { IService } from '@/app/_utils/type';
import { getToken } from '@/app/_utils/assistFunctions/userFunctions';
import { verifyToken } from '@/app/_utils/assistFunctions/userFunctions';
import { LoadingWheel } from '../ConditionalRelated/LoadingWheel';
import { useRouter } from 'next/navigation';

export const CreateService = () => {
  const [title, setTitle] = useState<IService['title']>('');
  const [description, setDesc] = useState<IService['description']>('');
  const [thumbnail, setThumbnail] = useState<IService['thumbnail']>();
  const stepsRow = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const [steps, setSteps] = useState<IService['steps']>(stepsRow);

  const router = useRouter();
  const costHolder = [{ id: 1 }];
  const [costs, setCosts] = useState<IService['costs']>(costHolder);
  const addCost = () => {
    const costHolder = [...costs];
    costHolder.push({ id: costs.length + 1 });
    setCosts(costHolder);
  };
  const updateDetail = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    holder: any,
    id: number,
    contentArea: string,
  ) => {
    let index = 0;
    const tempHolder = [...holder];
    for (let i = 0; i < holder.length; i++) {
      if (holder[i].id === id) {
        index = i;
      }
    }
    switch (contentArea) {
      case 'title':
        tempHolder[index].title = e.target.value;
        break;
      case 'description':
        tempHolder[index].description = e.target.value;
        break;
      default:
        break;
    }
    switch (holder) {
      case 'steps':
        setSteps(tempHolder);
        break;
      case 'costs':
        setCosts(tempHolder);
        break;
      case 'benefits':
        setBenefits(tempHolder);
        break;
      case 'reviews':
        setReviews(tempHolder);
        break;
      default:
        break;
    }
  };
  const [benefits, setBenefits] = useState<IService['benefits']>([]);
  const addBenefits = () => {
    const tempBenefit = [...benefits];
    tempBenefit.push({ id: benefits.length + 1 });
    setBenefits(tempBenefit);
  };

  const [reviews, setReviews] = useState<IService['reviews']>([]);

  const addReviews = () => {
    const tempReview = [...reviews];
    tempReview.push({ id: tempReview.length + 1 });
    setReviews(tempReview);
  };

  const [status, setStatus] = useState<IService['status']>();

  // conditional variable declaration
  const [load, setLoad] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  /**
   * @name submitService
   * @desc Function to send the service in the API
   * @return success or fail
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitService = async (e: any) => {
    try {
      e.preventDefault();
      const token = await getToken();
      await setLoad(true);
      const serverResponse = await fetch('/api/service', {
        headers: { Authorization: `Bearer: ${token}` },
        body: JSON.stringify({
          title,
          description,
          thumbnail,
          steps,
          benefits,
          reviews,
          status,
          costs,
        }),
        method: 'POST',
      });
      const serviceData = await serverResponse.json();
      if (serviceData['status'] === 403) {
        await setError(true);
      } else if (serviceData['status'] === 201) {
        await setSuccess(true);
      }
    } catch (error) {
      await console.error(error);
      await setError(true);
    } finally {
      await setLoad(false);
    }
  };
  useEffect(() => {
    const verify = async () => {
      const response = await verifyToken();
      await setLoad(false);
      if (!response) {
        await router.push('/login');
      }
      await setVerified(true);
    };
    if (load && !verified) {
      verify();
    }
    if (success) {
      router.push('/success');
    }
  }, [load, success, verified]);
  if (load) {
    return (
      <>
        <LoadingWheel />
      </>
    );
  }
  return (
    <>
      <div id='serviceForm' className='formArea'>
        <label htmlFor='title' className='formHeader'>
          サービス名
        </label>
        <input
          type='title'
          id='title'
          name='title'
          placeholder='サービス名を入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}></input>
        <label htmlFor='description' className='description'>
          サービスの概要
        </label>
        <textarea
          name='description'
          placeholder='サービスの概要の入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setDesc(e.target.value);
          }}></textarea>
        <label htmlFor='title' className='formHeader'>
          サービス用のサムネ画像
        </label>
        <input
          type='file'
          name='serviceThumbnail'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setThumbnail(e.target.value);
          }}></input>
        <label id='benefits' className='formHeader'>
          おすすめな理由の設定
        </label>

        {benefits.map((benefit) => {
          return (
            <div className='benefitInputs' key={benefit.id}>
              <label id='benefitTitle' className='formHeader'>
                理由{benefit.id}のヘッドライン・キャッチコピー
              </label>
              <br />
              <input
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, benefits, benefit.id, 'title');
                }}></input>
              <br />
              <label id='benefitTitle' className='formHeader'>
                理由{benefit.id}の説明
              </label>
              <br />
              <textarea
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, benefits, benefit.id, 'description');
                }}></textarea>
              <br />
            </div>
          );
        })}

        <div className='addRowContainer'>
          <button
            onClick={() => {
              addBenefits();
            }}
            className='addRowButton'
            id='addCostButton'>
            おすすめな理由を追加する
          </button>
        </div>
        <label id='steps' className='formHeader'>
          サービスの流れ
        </label>
        {steps.map((step) => {
          return (
            <div key={step.id} className='stepInputArea'>
              <label id='stepTitle' className='formHeader'>
                ステップ{step.id}のヘッドライン・キャッチコピー・主な説明
              </label>
              <input
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, steps, step.id, 'title');
                }}
                placeholder={step.title}></input>
              <label id='stepTitle' className='formHeader'>
                ステップ{step.id}のの細かい説明
              </label>
              <textarea
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, steps, step.id, 'description');
                }}
                placeholder={step.description}></textarea>
            </div>
          );
        })}
        <label id='costs' className='formHeader'>
          サービスの料金設定
        </label>
        {costs.map((cost) => {
          return (
            <div key={cost.id} className='costInputArea'>
              <label id='stepTitle' className='formHeader'>
                期限・回数・エリア範囲{cost.id}
              </label>
              <input
                name='priceType'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, costs, cost.id, 'title');
                }}
                placeholder={cost.title}></input>
              <label id='stepTitle' className='formHeader'>
                料金{cost.id}
              </label>
              <input
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, costs, cost.id, 'description');
                }}
                placeholder={cost.description}></input>
            </div>
          );
        })}
        <div className='addRowContainer'>
          <button
            onClick={() => {
              addCost();
            }}
            className='addRowButton'
            id='addCostButton'>
            値段を追加する
          </button>
        </div>
        <br />
        <label id='steps' className='formHeader'>
          サービスの感想の追加
        </label>
        {reviews.map((review) => {
          return (
            <div key={review.id} className='costInputArea'>
              <label id='stepTitle' className='formHeader'>
                感想{review.id}キーフレーズ・キャッチコピー・ヘッドライン
              </label>
              <input
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, reviews, review.id, 'title');
                }}
                name='priceType'
                placeholder={review.title}></input>
              <label id='stepTitle' className='formHeader'>
                感想{review.id}内容
              </label>
              <textarea
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateDetail(e, reviews, review.id, 'description');
                }}
                placeholder={review.description}></textarea>
            </div>
          );
        })}
        <div className='addRowContainer'>
          <button
            onClick={() => {
              addReviews();
            }}
            className='addRowButton'
            id='addCostButton'>
            感想を追加する
          </button>
        </div>
        <label id='status' className='formHeader'>
          サービスの公開状態 - 作成後にすぐに公開するか、しないか
        </label>
        <div className='formSelection'>
          <input
            type='radio'
            id='status'
            name='service_status'
            value='draft'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => {
              setStatus(e.target.value);
            }}></input>
          <label htmlFor='html'>非公開</label>
          <input
            type='radio'
            id='status'
            name='service_status'
            value='released'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => {
              setStatus(e.target.value);
            }}></input>
          <label htmlFor='html'>公開</label>
        </div>
        {error ? <span className='errorMsg'></span> : <></>}
        <div style={{ textAlign: 'center' }}>
          <button
            id='submitButton'
            onClick={submitService}
            disabled={!title && !description}>
            サービスを登録する
          </button>
        </div>
      </div>
    </>
  );
};
