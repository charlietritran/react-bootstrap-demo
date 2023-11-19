import http from "./HttpService";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/files");
};

const getDocs = (id) => {
  return http.get("/docs/" + id);
};

const FileUploadService = {
  upload,
  getFiles,
  getDocs,
};

export default FileUploadService;
