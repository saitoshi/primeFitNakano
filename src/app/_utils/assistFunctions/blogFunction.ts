/**
 * @name All of the functions related to blog features
 */

import { IBlog } from '../type';

/**
 * @name getBlogs
 * @desc A function that calls all of the blog related API and returns all of the blogs available
 * @return blogLists
 */
export async function getBlogs() {
  try {
    const blogResponses = await fetch('api/blog', {
      method: 'GET',
    });

    const blogData = await blogResponses.json();
    await console.log(blogData['blogs']);
    return blogData['blogs'].reverse();
  } catch (error) {
    await console.error(error);
    return error;
  }
}

/**
 * @name getBlog
 * @param _id
 * @desc Gets the blog detail based on the _id
 * @return specific blog info
 */
export async function getBlog(_id: string) {
  try {
    await console.log(_id);
    const blogResponse = await fetch(process.env.URL + `/api/blog/id=${_id}`, {
      method: 'GET',
    });
    const blogData = await blogResponse.json();
    await console.log(blogData['blog']);
    return blogData['blog'];
  } catch (error) {
    await console.error(error);
    return error;
  }
}

/**
 * @name getRecentBlogs
 * @desc A function that calls all of the blog related API and returns all of the blogs available
 * @return blogLists
 */
export async function getRecentBlogs() {
  try {
    const blogResponses = await fetch(process.env.URL + 'api/blog', {
      method: 'GET',
    });

    const blogData = await blogResponses.json();
    await console.log(blogData['blogs']);
    return blogData['blogs'].reverse().slice(0, 3);
  } catch (error) {
    return error;
  }
}

/**
 * @name getAvailableBlogs()
 * @desc gets all of the available blogs
 * @return blogList
 */
export async function getAvailableBlogs() {
  try {
    const blogList: IBlog[] = [];
    const blogResponses = await fetch('api/blog', {
      method: 'GET',
    });

    const blogData = await blogResponses.json();
    for (let i = 0; i < blogData['blogs'].length; i++) {
      if (blogData['blogs'][i].status === 'released') {
        await blogList.push(blogData['blogs'][i]);
      }
    }
    return blogList;
  } catch (error) {
    await console.error(error);
    return error;
  }
}
