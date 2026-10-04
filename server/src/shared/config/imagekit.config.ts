import ImageKit from 'imagekit';
import env from './env.config.js';

export type UploadFileInput = {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  folder?: string;
};

export type UploadFileResult = {
  fileId: string;
  url: string;
  fileName: string;
};

export interface StorageProvider {
  uploadFile(input: UploadFileInput): Promise<UploadFileResult>;

  deleteFile(fileId: string): Promise<void>;

  getFileUrl(fileId: string): string;
}

class ImageKitStorage implements StorageProvider {
  private readonly client: ImageKit;

  constructor() {
    this.client = new ImageKit({
      publicKey: env.IMAGEKIT_PUBLIC_KEY!,
      privateKey: env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT!,
    });
  }

  async uploadFile(input: UploadFileInput): Promise<UploadFileResult> {
    const options = {
      file: input.buffer,
      fileName: input.fileName,
      ...(input.folder && { folder: input.folder }),
    };
    const result = await this.client.upload(options);

    return {
      fileId: result.fileId,
      url: result.url,
      fileName: result.name,
    };
  }

  async deleteFile(fileId: string): Promise<void> {
    await this.client.deleteFile(fileId);
  }

  getFileUrl(fileId: string): string {
    // ImageKit generally gives you the URL during upload.
    // Keep this method only if your provider supports reliable
    // URL reconstruction from an ID.
    return `${process.env.IMAGEKIT_URL_ENDPOINT}/${fileId}`;
  }
}

export default ImageKitStorage;
