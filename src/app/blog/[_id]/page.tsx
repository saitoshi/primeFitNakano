import type { Metadata } from 'next';
import { IBlog, IParagraph } from '@/app/_utils/type';
import { RecentBlogList } from '@/app/_components/BlogRelated/RelatedBlog';
import './style.css';
type tParams = Promise<{ _id: string }>;
import {
  getBlog,
  getRecentBlogs,
} from '@/app/_utils/assistFunctions/blogFunction';
import { ErrorMsg } from '@/app/_components/ConditionalRelated/Error';
import { Footer } from '@/app/_components/Footer/Footer';
export const generateMetadata = async (props: {
  params: tParams;
}): Promise<Metadata> => {
  const { _id } = await props.params;
  const blogInfo: IBlog = await getBlog(_id);
  if (blogInfo === undefined || blogInfo === null) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: blogInfo.title,
    description: blogInfo.description,
    keywords: blogInfo.keyword,
    openGraph: {
      title: blogInfo.title,
      description: blogInfo.description,
      type: 'article',
      images: blogInfo.thumbnail,
    },
  };
};
export default async function Page(props: { params: tParams }) {
  const { _id } = await props.params;
  const blogInfo: IBlog = await getBlog(_id);
  const recentBlogs: IBlog[] = await getRecentBlogs();
  await console.log(recentBlogs);
  if (blogInfo === undefined || blogInfo === null) {
    return (
      <>
        <ErrorMsg />
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className='pageContainer'>
        <div id='blogTitleArea'>
          <h2>
            <p className='subHeader'>BLOG</p>
            <p className='mainHeader'>{blogInfo.title}</p>
          </h2>
          <p className='publishedDate'>
            {blogInfo.publishedDate?.toString().split('T')[0]}
          </p>
        </div>
        <div id='blogMainImg' className='imgBox'>
          <img className='imgResponsive' src={blogInfo?.thumbnail} />
        </div>
        <div id='blogContent'>
          {blogInfo.content.map((paragraph: IParagraph) => {
            return (
              <div className='paragraph' key={paragraph.id}>
                {paragraph.header ? (
                  <h3 className='sectionHead'>{paragraph.header}</h3>
                ) : (
                  <></>
                )}
                {paragraph.body ? (
                  <p className='bodyMessage'>{paragraph.body}</p>
                ) : (
                  <></>
                )}
                {paragraph.image ? (
                  <div className='imgBox'>
                    <img
                      className='imgResponsive'
                      alt='image for paragraphs'
                      src={paragraph.image}
                    />
                    <p className='imgComment'>{paragraph.imageDesc}</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
        <br />
        <RecentBlogList blogs={recentBlogs} />
      </div>
      <Footer />
    </>
  );
}
