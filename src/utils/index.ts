import fs from "fs";

const writeFile = (path: string, data: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.writeFile(path, data, "utf8", (err: Error) => {
      if (err) throw err;
      resolve(true);
    });
  });
};

export { writeFile };
