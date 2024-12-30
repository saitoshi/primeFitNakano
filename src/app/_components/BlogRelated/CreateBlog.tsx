'use client';
import { useState, useEffect } from 'react';
import { IBlog } from '@/app/_utils/type';
import { verifyToken } from '@/app/_utils/assistFunctions/userFunctions';
import { LoadingWheel } from '../ConditionalRelated/LoadingWheel';
import { useRouter } from 'next/navigation';

export const CreateBlog = () => {
  const router = useRouter();
  const [title, setTitle] = useState<IBlog['title']>();
  const [description, setDesc] = useState<IBlog['description']>();
  const [thumbnail, setThumbnail] = useState<IBlog['thumbnail']>();
  const [keyword, setKeyword] = useState<IBlog['keyword']>();
  const [keywordHolder, setKeywordHolder] = useState<string>();
  const [content, setContent] = useState<IBlog['content']>([]);
  const addContent = () => {
    const contentHolder = [...content];
    contentHolder.push({ id: content.length + 1 });
    setContent(contentHolder);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateContent = async (e: any, id: number, value: string) => {
    const tempContent = [...content];
    await console.log(e.target.value);
    let index = 0;
    for (let i = 0; i < content.length; i++) {
      if (content[i].id === id) {
        index = i;
      }
    }
    await console.log(index);
    switch (value) {
      case 'header':
        tempContent[index].header = e.target.value;
        break;
      case 'body':
        tempContent[index].body = e.target.value;
        break;
      case 'image':
        tempContent[index].image = e.target.value;
        break;
      default:
        tempContent[index].imageDesc = e.target.value;
    }
    await setContent(tempContent);
    await console.log(content);
  };
  const [status, setStatus] = useState<IBlog['status']>();
  // conditional variable declaration
  const [load, setLoad] = useState<boolean>(true);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const verify = async () => {
      const response = await verifyToken();
      await setLoad(false);
      if (!response) {
        await router.push('/login');
      }
    };
    verify();
    if (success) {
      router.push('/success');
    }
    if (load) {
      verify();
    }
  }, [load, success]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitBlog = async (e: any) => {
    try {
      e.preventDefault();
      await setLoad(true);
      const keywordList = await keywordHolder.split(',');
      await setKeyword(keywordList);
      await console.log(
        title,
        description,
        thumbnail,
        keyword,
        content,
        status,
      );
      await setSuccess(true);
    } catch (error) {
      await console.log(error);
      await setError(true);
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
      <div id='blogForm' className='formArea'>
        <label htmlFor='title' className='formHeader'>
          ブログタイトル
        </label>
        <input
          type='title'
          id='title'
          placeholder='ブログのタイトル'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}></input>
        <label htmlFor='title' className='formHeader'>
          ブログ用のメイン画像
        </label>

        <input
          type='file'
          name='serviceThumbnail'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setThumbnail(e.target.value);
          }}></input>
        <label htmlFor='description' className='description'>
          ブログの概要
        </label>

        <textarea
          name='description'
          placeholder='サービスの概要の入力'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setDesc(e.target.value);
          }}></textarea>
        <label htmlFor='keywords' className='formHeader'>
          ブログキーワード - キーワードの間に<b>,</b>
          を追加し、分けてください。
        </label>
        <input
          type='keyword'
          id='keyword'
          placeholder='ブログのキーワード (例：筋トレ,食事)'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            setKeywordHolder(e.target.value);
          }}></input>
        <label htmlFor='contents' className='formHeader'>
          ブログコンテンツ
        </label>
        <p>段落を追加したい場合、ボタンをクリックしてください。</p>
        {content.map((paragraph) => {
          return (
            <div className='contentArea' key={paragraph.id}>
              <input
                type='text'
                id='contentHeader'
                placeholder='ブログの段落のヘッダー'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateContent(e, paragraph.id, 'header');
                }}></input>
              <textarea
                className='contentText'
                placeholder='ブログの段落の文書'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateContent(e, paragraph.id, 'body');
                }}></textarea>
              <label htmlFor='title' className='formHeader'>
                ブログ用の段落用画像
              </label>
              <input
                type='file'
                name='paragraphImage'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateContent(e, paragraph.id, 'image');
                }}></input>
              <input
                type='text'
                id='paragraphImageDesc'
                placeholder='段落画像の説明文'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  updateContent(e, paragraph.id, 'imageDesc');
                }}></input>
            </div>
          );
        })}
        <div className='addRowContainer'>
          <button
            onClick={() => {
              addContent();
            }}
            className='addRowButton'
            id='addCostButton'>
            段落を追加する
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
        <div style={{ textAlign: 'center' }}>
          <button
            id='submitButton'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              submitBlog(e);
            }}>
            ブログ登録
          </button>
        </div>
        {error ? (
          <span className='errorMsg'>エラーが発生いたしました</span>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
