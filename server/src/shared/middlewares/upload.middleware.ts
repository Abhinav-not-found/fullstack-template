import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
      return;
    }

    cb(null, true);
  },
});

export default upload;

// example use case:

// router.post(
//   '/blog',
//   upload.single('banner'),
//   createBlog,
// )

// Then:

// const file = req.file
// if (!file) {
//   throw ApiError.badRequest('Banner is required')
// }
// const result = await uploadFile({
//   buffer: file.buffer,
//   fileName: file.originalname,
//   mimeType: file.mimetype,
//   folder: '/Portfolio/Blog_Banners',
// })
