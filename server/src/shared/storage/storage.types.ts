export type UploadFileInput = {
  buffer: Buffer
  fileName: string
  mimeType: string
  folder?: string
}

export type UploadFileResult = {
  fileId: string
  url: string
  fileName: string
}

export interface StorageProvider {
  uploadFile(input: UploadFileInput): Promise<UploadFileResult>
  deleteFile(fileId: string): Promise<void>
}