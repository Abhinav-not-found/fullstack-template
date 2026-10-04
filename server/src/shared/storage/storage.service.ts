import ImageKitStorage from './providers/imagekit.storage.js';

const storage = new ImageKitStorage();

export const uploadFile = storage.uploadFile.bind(storage);

export const deleteFile = storage.deleteFile.bind(storage);


// example use case

// const result = await uploadFile({
//   buffer,
//   fileName: `blog-banner-${Date.now()}`,
//   mimeType: file.type,
//   folder: '/Portfolio/Blog_Banners',
// })
// console.log(result.url)

// OR 

// await deleteFile(fileId)