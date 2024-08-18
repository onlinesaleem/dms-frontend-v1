// src/types.ts
export interface File {
    id: number;
    fileName: string;
    filePath: string;
    uploadDate: Date;
    documentId: number;
  }
  
  export interface Document {
    id: number;
    title: string;
    description: string;
    createdDate: Date;
    createdByUserId: number;
    files: File[];
  }
  