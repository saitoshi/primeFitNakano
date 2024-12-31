import type { Metadata } from 'next';
import { IBlog } from '@/app/_utils/type';
import { EditBlogForm } from '@/app/_components/BlogRelated/EditBlog';
type tParams = Promise<{ _id: string }>;
import { getBlog } from '@/app/_utils/assistFunctions/blogFunction';
import { ErrorMsg } from '@/app/_components/ConditionalRelated/Error';

export const generateMetadata = async (props: {
  params: tParams;
}): Promise<Metadata> => {
  const { _id } = await props.params;
  const blogInfo: IBlog = await getBlog(_id);
  await console.log(blogInfo);
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
  let error: boolean = false;
  const { _id } = await props.params;
  const blogInfo = await getBlog(_id);
  if (blogInfo === null) {
    error = true;
  }
  if (error) {
    return <ErrorMsg />;
  }
  return (
    <>
      <div id='editService' className='pageContainer'>
        <h2>
          <p className='subHeader'>EDIT BLOG</p>
          <p className='mainHeader'>{blogInfo?.title}を編集する</p>
        </h2>
        <EditBlogForm blog={blogInfo} />
      </div>
    </>
  );
}
