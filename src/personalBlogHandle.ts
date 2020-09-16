import personalBlogData from "./data/personalBlog";
import { writeFile } from "./utils";
import { PERSONAL_BLOG_DATA_PATH } from "./constant";
import { ResourceItemType } from "./data";
import TAG from "./constant/tag";

const getResources = (resources: ResourceItemType[]) => {
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
  return resources2Str;
};

const getTags = (tags: TAG[]) => {
  let tagsToStr = "";
  if (!tags.length) {
    tagsToStr = "/";
  } else {
    tagsToStr = tags.join("、");
  }
  return tagsToStr;
};

const handlePersonBlogData = async () => {
  const mdTableHeader = {
    author: "作者",
    blog: "博客",
    resources: "相关资源",
    tag: "标签",
    star: "star",
  };
  let mdBlogTable = `${mdTableHeader.author} | ${mdTableHeader.blog} | ${mdTableHeader.tag} | ${mdTableHeader.star} | ${mdTableHeader.star}
------------ | ------------- | ------------- | ------------- | -------------`;
  personalBlogData.sort(
    (data1, data2) => (data2.blog.starNum || 0) - (data1.blog.starNum || 0)
  );
  personalBlogData.forEach((item) => {
    const { author, link, blog, resources, tags } = item;
    const resources2Str = getResources(resources);
    const tagsToStr = getTags(tags);
    mdBlogTable += `
[${author}](${link}) | [${blog.name}](${blog.link}) | ${resources2Str} | ${tagsToStr} | ![${author}](${blog.starImg})`;
  });
  const isWriteSucceed = await writeFile(PERSONAL_BLOG_DATA_PATH, mdBlogTable);
  return mdBlogTable;
};

export default handlePersonBlogData;
