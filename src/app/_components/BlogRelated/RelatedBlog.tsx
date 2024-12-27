import { IBlog } from '@/app/_utils/type';
import './style.css';
import Link from 'next/link';

type blogInputs = {
  blogs: IBlog[];
};

export const RecentBlogList = ({ blogs }: blogInputs) => {
  return (
    <div id='blogRecommendation' className='listArea'>
      <h3 className='areaTitle'>
        <p className='subHeader'>NEW</p>
        <p className='mainHeader'>最新のブログ</p>
      </h3>
      {blogs.map((blog: IBlog) => {
        return (
          <div className='listTable' key={blog._id}>
            <dt>
              <img src={blog.thumbnail} className='imgResponsive' />
            </dt>
            <dd className='listLink'>
              <Link href={`/blog/${blog._id}`}>
                <h3 className='tableTitle'>{blog.title}</h3>
                <p className='tableDesc'>{blog.description}</p>
                {blog.keyword.map((item) => {
                  return (
                    <li className='keywordList' key={item}>
                      {item}
                    </li>
                  );
                })}
              </Link>
            </dd>
          </div>
        );
      })}
    </div>
  );
};
