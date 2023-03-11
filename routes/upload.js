require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();
const multer = require(`multer`);
const port = process.env.PORT || 5000;
const thumbnailGenerator = `../helpers/videoThumbnails.js`;

const UPLOADS_FOLDER = `media/uploads/`;

const videoStorage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, UPLOADS_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

const upload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 mb
  },
});

router.post(`/`, upload.single(`file`), (req, res, next) => {
  thumbnailGenerator.generateThumbnail(
    // /api/videos is made publically available in App.js
    "http://localhost:" +
      port +
      "/api/videos/" +
      req.file.filename.replace(/ /g, "_"),
    req.file.filename.replace(/ /g, "_"),
    req.userData.firstName
  );
  res.status(200).json({
    message: "Video upload successful",
  });
});

module.exports = router;
