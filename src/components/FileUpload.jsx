import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import PropTypes from "prop-types";

const properties = {
  callback: PropTypes.function,
};

const defaultProperties = {
  callback: -1,
};

const FileUpload = (props) => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  useEffect(() => {
    console.log("FILE UPLOAD USE-EFFECT IS CALLED");
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);
    console.log(
      "CURRENT FILE:" +
        currentFile.name +
        " -  lastmod:" +
        currentFile.lastModified
    );

    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        files.data.map((file, index) => {
          console.log("FILE NAME:" + file.name + " - URL:" + file.url);
        });

        setFileInfos(files.data);
        props.callback(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  return (
    <div>
      {currentFile && (
        <div className="progress ">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      <div className="alert alert-light " role="alert">
        {message}
      </div>

      <div className="card ">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div>
      <label className="btn btn-default">
        <input type="file" onChange={selectFile} />
      </label>
      <button
        className="btn btn-success"
        disabled={!selectedFiles}
        onClick={upload}
      >
        Upload
      </button>
    </div>
  );
};

FileUpload.propTypes = properties;
FileUpload.defaultProps = defaultProperties;
export default FileUpload;
