'use client';
import { useState, useEffect } from 'react';
import { LoadingWheel } from '../_components/ConditionalRelated/LoadingWheel';
import { IBlog } from '../_utils/type';
import { BlogCard } from '../_components/BlogRelated/BlogCard';
import { Footer } from '../_components/Footer/Footer';
export default function Blog() {
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<IBlog[]>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogResponses = await fetch('api/blog', {
          method: 'GET',
        });
        const blogData = await blogResponses.json();
        const blogs: IBlog[] = blogData['blogs'].reverse();
        setBlogList(blogs);
        setIsLoad(false);
      } catch (error) {
        return error;
      }
    };
    fetchBlogs();
  }, []);
  if (isLoad) {
    return <LoadingWheel />;
  }
  return (
    <div id='blogPage'>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>BLOGS</p>
          <p className='mainHeader'>最新のブログ</p>
        </h2>
        <ul className='cardList'>
          {blogList!.map((blog: IBlog) => {
            return <BlogCard key={blog._id} blog={blog} />;
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
