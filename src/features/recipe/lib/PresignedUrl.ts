export interface PresignedUrlRequest {
  fileName: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
}
