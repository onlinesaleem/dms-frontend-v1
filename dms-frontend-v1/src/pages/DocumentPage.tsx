import React, { useEffect, useState } from "react";
import { getDocuments, getFileBlob } from "../services/documentService";

import {  Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { Document } from "../types/documenttypes";
import Layout from "./Layout";

const DocumentPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [fileUrls, setFileUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);  // This should now correctly set the state
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleViewFile = async (documentId: number, fileName: string) => {
    try {
      const fileBlob = await getFileBlob(documentId, fileName);
      const fileUrl = URL.createObjectURL(fileBlob);
      setFileUrls((prevUrls) => ({
        ...prevUrls,
        [`${documentId}-${fileName}`]: fileUrl,
      }));
    } catch (error) {
      console.error("Failed to fetch the file:", error);
    }
  };

  return (
  <Layout>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      <List>
        {documents.map((document) => (
          <ListItem key={document.id}>
            <ListItemText primary={document.title} secondary={document.description} />
            {document.files.map((file) => (
              <div key={file.fileName}>
                <Button onClick={() => handleViewFile(file.documentId, file.fileName)}>
                  View {file.fileName}
                </Button>
                {fileUrls[`${file.documentId}-${file.fileName}`] && (
                  <div>
                    {file.fileName.endsWith(".pdf") ? (
                      <iframe
                        src={fileUrls[`${file.documentId}-${file.fileName}`]}
                        width="100%"
                        height="600px"
                      />
                    ) : (
                      <img
                        src={fileUrls[`${file.documentId}-${file.fileName}`]}
                        alt={file.fileName}
                        style={{ maxWidth: "100%", maxHeight: "400px" }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </ListItem>
        ))}
      </List>
      </Layout>
  );
};

export default DocumentPage;
