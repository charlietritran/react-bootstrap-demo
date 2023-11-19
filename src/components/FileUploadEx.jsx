import React, { useRef, useEffect } from "react";
import axios from "axios";
import useFileUpload from "react-use-file-upload";
import "../App.css";

import PropTypes from "prop-types";

const properties = {
  callback: PropTypes.func,
};

const defaultProps = {
  callback: () => {},
};

//export default function App() {
const FileUploadEx = (props) => {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const inputRef = useRef();

  useEffect(() => {
    props.callback(files);
  }, [files]);

  return (
    <div key="1">
      <div>
        <div>
          {/* Display the files to be uploaded */}
          <div>
            <div className="ms-4 me-4">
              <div className="row">
                <div className="form-group w-75 row border border-primary">
                  <label>Document Name(s)</label>
                </div>

                <div className="form-group w-25 row border border-primary">
                  <label>Action</label>
                </div>
              </div>
              {fileNames.map((name, index) => (
                <div className="row">
                  <div className="form-group w-75 row border border-primary">
                    <span key={index}>{name}</span>
                  </div>

                  <div className="form-group w-25 row border border-primary">
                    <button
                      key={index}
                      type="button"
                      className="fa fa-times"
                      onClick={() => removeFile(name)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Provide a drop zone and an alternative button inside it to upload files. */}
          <div
            onDragEnter={handleDragDropEvent}
            onDragOver={handleDragDropEvent}
            onDrop={(e) => {
              handleDragDropEvent(e);

              //e.currentTarget.files[0].name
              const found = files.find(
                (file) => file.name == e.currentTarget.files[0].name
              );
              if (!found) {
                console.log(
                  "UPLOAD NOT FOUND SO ADD:" + e.currentTarget.files[0].name
                );
                setFiles(e, "a");
                //inputRef.current.value = null;
              } else {
                console.log(
                  "UPLOAD FOUND SO NO ADD:" + e.currentTarget.files[0].name
                );
              }

              //setFiles(e, "a");
              //const formData = createFormData();
              //props.callback(formData, files);
            }}
          >
            <br />
            <p>Drag and drop files here or </p>

            {/** NOTE: */}
            {/** set type=button to prevent auto submit when selected a file */}
            {/** ------------------------------------------------- */}
            <button type="button" onClick={() => inputRef.current.click()}>
              Select File(s)
            </button>

            {/* Hide the crappy looking default HTML input */}
            <input
              ref={inputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                //e.currentTarget.files[0].name
                const found = files.find(
                  (file) => file.name == e.currentTarget.files[0].name
                );
                if (!found) {
                  console.log(
                    "UPLOAD NOT FOUND SO ADD:" + e.currentTarget.files[0].name
                  );
                  setFiles(e, "a");
                  inputRef.current.value = null;
                } else {
                  console.log(
                    "UPLOAD FOUND SO NO ADD:" + e.currentTarget.files[0].name
                  );
                }

                //setFiles(e, "a");
                //inputRef.current.value = null;
                //const formData = createFormData();
                //props.callback(formData, files);
              }}
            />
          </div>
        </div>

        {/**         <div className="submit">
          <button onClick={handleSubmit}>Submit</button>
        </div>*/}
      </div>
    </div>
  );
};

FileUploadEx.propTypes = properties;
FileUploadEx.defaultProps = defaultProps;

export default FileUploadEx;
