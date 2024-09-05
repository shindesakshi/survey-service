var { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const config = require("../config");
var multer = require("multer");
var multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: config.aws.s3.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

var maxCount = 100;

const upload = async (req, res, path) => {
  const upload_file = multer({
    storage: multerS3({
      s3: s3,
      bucket: config.aws.s3.bucket,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        var extension = path + "/" + Date.now() + "_" + file.originalname;
        cb(null, extension);
      },
    }),
  }).array("file", maxCount);

  return new Promise(async function (resolve, reject) {
    try {
      await upload_file(req, res, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(req.files);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteImageFromS3 = async (key) => {
  try {
    const data = await s3.send(
      new DeleteObjectCommand({
        Bucket: config.aws.s3.bucket,
        Key: key,
      })
    );

    console.log(data);
    return data;
  } catch (e) {
    console.log(e, "e");
    throw e;
  }
};

const deleteMultipleImagesFromS3 = async (imageNames) => {
  for (const imageName of imageNames) {
    await deleteImageFromS3(imageName.image);
  }
};

module.exports = {
  upload,
  deleteImageFromS3,
  deleteMultipleImagesFromS3,
};
