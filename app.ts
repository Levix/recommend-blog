import handlePersonBlogData from "./src/personalBlogHandle";
import { writeFile } from "./src/utils";
import { README_MD_PATH } from "./src/constant";

const app = async () => {
  const personalMdBlogTable = await handlePersonBlogData();
  if (personalMdBlogTable) {
    writeFile(
      README_MD_PATH,
      `# 个人博客

${personalMdBlogTable}
      `
    );
  }
};

app();
