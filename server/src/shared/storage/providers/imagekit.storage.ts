import ImageKit from 'imagekit';

import env from '@/shared/config/env.config.js';
import type { StorageProvider, UploadFileInput, UploadFileResult } from '../storage.types.js';

class ImageKitStorage implements StorageProvider {
  private readonly client: ImageKit;

  constructor() {
    this.client = new ImageKit({
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
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
}

export default ImageKitStorage;
