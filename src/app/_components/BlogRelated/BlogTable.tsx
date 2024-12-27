'use client';
import { useState, useEffect } from 'react';
import { getBlogs } from '@/app/_utils/assistFunctions/blogFunction';
import './style.css';
import { IBlog } from '@/app/_utils/type';
import Link from 'next/link';

export const BlogTable = () => {
  const [load, setLoad] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<[IBlog]>();
  const [isError, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('エラーが発生いたしました');
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getBlogs();
      setBlogList(blogs);
      setLoad(false);
    };
    fetchBlogs();
  }, []);

  if (load) {
    return (
      <div className='pageSection' id='loadMessage'>
        読み込み中...
      </div>
    );
  } else if (isError) {
    <div className='pageSection' id='errorMessage'>
      <span className='errorMsg'>{errorMsg}</span>
    </div>;
  }
  return (
    <>
      <div id='blogList'>
        <h2 className='listHeader'>
          <p className='subHeader'>BLOG ARCHIVE</p>
          <p className='mainHeader'>ブログ</p>
        </h2>
        <ul className='responsive-table'>
          <li className='tableHeader'>
            <div className='blog col-1'>タイトル</div>
            <div className='blog col-2'>概要</div>
            <div className='blog col-3'>サムネ画像</div>
            <div className='blog col-4'>公開・非公開</div>
            <div className='blog col-5'>編集</div>
            <div className='blog col-6'>作成日</div>
          </li>
          {blogList?.map((blog: IBlog) => {
            return (
              <li className='tableRow' key={blog._id}>
                <div className='blog col-1'>{blog.title}</div>
                <div className='blog col-2'>{blog.description}</div>
                <div className='blog col-3'>
                  <div className='imgBox'>
                    <img src={blog.thumbnail} className='imgResponsive'></img>
                  </div>
                </div>
                <div className='blog col-4'>
                  {blog.status === 'draft' ? <p>非公開</p> : <p>公開</p>}
                </div>
                <div className='blog col-5'>
                  <Link
                    href={`/edit-blog/${blog._id}`}
                    style={{ textDecoration: 'none' }}>
                    <button className='edit-button'>&#x270E;</button>
                  </Link>
                </div>
                <div className='blog col-6'>
                  {blog.publishedDate.toString().split('T')[0]}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
