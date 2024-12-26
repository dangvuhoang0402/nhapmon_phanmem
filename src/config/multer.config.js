const multer = require("multer");
const path = require("path");

const storageClass = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/storage/upload/class/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storageDevice = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/storage/upload/device/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storageTeacher = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/storage/upload/teacher/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storageStudent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/storage/upload/student/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storageSession = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/storage/upload/session/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Define file filter to accept only .xlsx files
const fileFilter = (req, file, cb) => {
  const allowedMimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const extname = path.extname(file.originalname).toLowerCase() === ".xlsx";
  const mimetype = file.mimetype === allowedMimeType;
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only .xlsx files are allowed!"));
  }
};
const uploadStudent = multer({
  storage: storageStudent,
  fileFilter: fileFilter,
});
const uploadClass = multer({
  storage: storageClass,
  fileFilter: fileFilter,
});
const uploadTeacher = multer({
  storage: storageTeacher,
  fileFilter: fileFilter,
});
const uploadSession = multer({
  storage: storageSession,
  fileFilter: fileFilter,
});
const uploadDevice = multer({
  storage: storageDevice,
  fileFilter: fileFilter,
});
module.exports = {
  uploadStudent,
  uploadClass,
  uploadTeacher,
  uploadSession,
  uploadDevice
};
