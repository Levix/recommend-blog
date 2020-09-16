import personalBlogData from "./data/personalBlog";
import { writeFile } from "./utils";
import { PERSONAL_BLOG_DATA_PATH } from "./constant";

const handlePersonBlogData = async () => {
  const mdTableHeader = {
    author: "作者",
    blog: "博客",
    resources: "相关资源",
    star: "star",
  };
  let mdBlogTable = `${mdTableHeader.author} | ${mdTableHeader.blog} | ${mdTableHeader.resources} | ${mdTableHeader.star}
------------ | ------------- | ------------- | -------------`;
  personalBlogData.sort(
    (data1, data2) => (data2.blog.starNum || 0) - (data1.blog.starNum || 0)
  );
  personalBlogData.forEach((item) => {
    const { author, link, blog, resources } = item;
    let resources2Str = "";
    if (!resources.length) {
      resources2Str = "/";
    } else {
      resources.forEach((resource, resourceIndex) => {
        const { name, link } = resource;
        if (!link) {
          resources2Str += `${
            resources.length > 1 ? `${resourceIndex + 1}. ` : ""
          }${name} <br>`;
        } else {
          resources2Str += `${
            resources.length > 1 ? `${resourceIndex + 1}. ` : ""
          }[${name}](${link}) <br>`;
        }
      });
    }
    mdBlogTable += `
[${author}](${link}) | [${blog.name}](${blog.link}) | ${resources2Str} | ![${author}](${blog.starImg})`;
  });
  const isWriteSucceed = await writeFile(PERSONAL_BLOG_DATA_PATH, mdBlogTable);
  return mdBlogTable;
};

export default handlePersonBlogData;
