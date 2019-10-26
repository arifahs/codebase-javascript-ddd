const Minio = require('minio');
let minioClient;

const init = () => {
  minioClient = new Minio.Client({
    endPoint: '',
    port: 9000,
    useSSL: true,
    accessKey: '',
    secretKey: '',
  }); // place your config here
};

const presignedGetObject = async (url, bucketName) => {
  const result = await minioClient.presignedGetObject(bucketName, url, 24 * 60 * 60);

  if (result) {
    return result;
  }
};

const objectUpload = async (bucketName, objectName, filePath) => {
  try {
    const isUploaded = await minioClient.fPutObject(bucketName, objectName, filePath);
    if (isUploaded) {
      return isUploaded;
    }
  } catch (err) {
    return err;
  }
};

const streamUpload = async (bucketName, objectName, newBuffer) => {
  try {
    const isUploaded = await minioClient.putObject(bucketName, objectName, newBuffer);
    if (isUploaded) {
      return isUploaded;
    }
  } catch (err) {
    return err;
  }
};

// this is my change


module.exports = {
  init,
  presignedGetObject,
  objectUpload,
  streamUpload,
};
