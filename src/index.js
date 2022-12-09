import axios from 'axios';
import * as fs from 'fs/promises';

const getFilename = (url) => {
  const urlWithoutProtocol = url.split('//')[1];
  const regex = /[^a-z0-9A-z]/ig;
  return `${urlWithoutProtocol.replaceAll(regex, '-')}.html`;
};

export default (url, dirPath) => axios.get(url)
  .then((response) => {
    const { data } = response;
    const filename = getFilename(url);
    const filepath = `${dirPath}/${filename}`;
    return fs.writeFile(filepath, data).then(() => filepath);
  })
  .catch((err) => console.log(err));
