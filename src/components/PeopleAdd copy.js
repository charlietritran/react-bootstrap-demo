import React, { useState, useEffect, useSelector } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// REDUX
import store from "../store";
import { selectUserData } from "../redux/selectors/userSelectors";
import { updateUser } from "../redux/actions/user";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  ArrowRight,
  Download,
  X,
  Pen,
  Eraser,
  XCircle,
  Trash,
  PenFill,
} from "react-bootstrap-icons";

// SERVICES
import AuthService from "../services/auth.service";
import PeopleService from "../services/PeopleService.js";
import UploadService from "../services/FileUploadService";
import PeopleEdit from "./PeopleEdit";
import FileUpload from "./FileUpload";
import FileUploadEx from "./FileUploadEx";

/** /////////////////////////////////////////////////////////////////
 * COMPONENT: People Add
 *
 * PURPOSE:
 *
 * @returns
 *
 *
 */ ////////////////////////////////////////////////////////////////
const PeopleAdd = () => {
  const peopleService = new PeopleService();

  // records
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState([]);

  // Data form
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [gender, setGender] = useState("");
  const [documents, setDocuments] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);

  const [docInfos, setDocInfos] = useState([]);

  const [fileUploadRerenderKey, setFileUploadRerenderKey] = useState(
    Math.random()
  );

  // for Modal dialog
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    birthdate: Yup.string().required("Birth Date is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function handleOnChange(event) {
    alert("File is selcted");
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * SUBMIT
   */
  const onSubmit = async (data) => {
    console.log(data);

    console.log(JSON.stringify(data, null, 2));
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setBirthdate(data.birthdate);
    setGender(data.gender);

    // data wrapper
    var jsontxt = {
      firstname: data.firstname,
      lastname: data.lastname,
      birthdate: data.birthdate,
      gender: data.gender,
      documents: "",
    };

    // Call service to add  new entry to db
    const response = await peopleService.savePersonMultiModel(
      jsontxt,
      uploadFiles
    );

    // If success, get new record back and display to UI
    /*if (response.data) {
      UploadService.getDocs(response.data.id).then((result) => {
        setDocInfos(result.data);
        result.data.map((file, index) => {
          console.log("URL:" + file.url);
        });

        peopleService.getPersonById(response.data.id).then((result1) => {
          console.log(result1.data);

          let tempArr = [];
          tempArr.push(result1.data);
          setPeople(result1.data);
        });
      });

      await peopleService.getPersonById(response.data.id).then((result) => {
        console.log(result.data);

        var tempArr = [];
        tempArr.push(result.data);
        setPeople(tempArr);
      });
      
      const arrayDataItems = courses.map((course) => <li>{course}</li>);
      
      await peopleService.getPersonById(response.data.id).then((result) => {
        console.log(result.data);

        var tempArr = [];
        tempArr.push(result.data);
        setPeople(tempArr);
      });

      //TODO: handle error in catch

      //TODO: handle error in catch

      // clear data and notify user
      reset();
      setFileUploadRerenderKey(Math.random()); // rerender fileupload by update component key
      handleShow();
    }*/

    // If success, notify and reset fields
    if (response.data) {
      peopleService.getPersonById(response.data.id).then((result) => {
        console.log(result.data);
        var tempArr = [];
        tempArr.push(result.data);
        setPeople(tempArr);
      });
      reset();
      setFileUploadRerenderKey(Math.random()); // rerender fileupload by update component key
      handleShow();
    }
  };

  const onSubmit_ORG = async (data) => {
    console.log(data);
    console.log(data.documents[0].name);

    console.log(JSON.stringify(data, null, 2));
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setBirthdate(data.birthdate);
    setGender(data.gender);
    setDocuments(data.documents[0].name);

    // data wrapper
    var jsontxt = {
      firstname: data.firstname,
      lastname: data.lastname,
      birthdate: data.birthdate,
      gender: data.gender,
      documents: "",
    };
    console.log("ON SUBMIT JSON:" + JSON.stringify(jsontxt));
    // Call service to add  new entry to db
    const response = await peopleService.savePerson(jsontxt);
    console.log("SERVICE RETURN:" + response.data.id);

    // If success, notify and reset fields
    if (response.data) {
      peopleService.getPersonById(response.data.id).then((result) => {
        console.log(result.data);
        var tempArr = [];
        tempArr.push(result.data);
        setPeople(tempArr);
      });
      reset();
      setUploadFiles([]);
      displayUploads();
      handleShow();
    }
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {}, []); // Add empty array to force it run only one time.  no repeat after render

  /**
   * Load person
   * @param {*} id
   */
  const loadPerson = (id) => {
    //console.log("rowId:" + props.rowId);
    peopleService.getPersonById(id).then((result) => {
      console.log(result.data);
      //var tempArr = [];
      //tempArr.push(result.data);
      setPerson(result.data);
    });
  };

  /**
   * Handle delete new record
   * @param {*} rowId
   * @param {*} name
   */
  const handleDelete = (rowId, name) => {
    console.log("ROW-ID:" + rowId);
    //1 YourCellName
  };

  /**
   * Handle edit new record
   * @param {*} rowId
   * @param {*} name
   */
  const handleEdit = (rowId, name) => {
    console.log("ROW-ID:" + rowId);
    loadPerson(rowId);
    setModalShow(true);
    //1 YourCellName
  };

  /**
   * Callback method from upload component to update files selected.
   * @param {*} files
   * @param {*} formData
   */
  const uploadCallback = (files, formData) => {
    files.forEach((element) => {
      console.log("file:", element, element.name);
      const found = uploadFiles.find((file) => file.name == element.name);
      if (!found) {
        console.log("Added file:" + element.name);
        let temp = [...uploadFiles];
        temp.push(element);
        setUploadFiles(temp);
      } else {
        console.log("Duplicate found - Skip:" + element.name);
      }
    });

    displayUploads();
  };

  const displayUploads = () => {
    uploadFiles.forEach((element) => {
      console.log("upload:", element, element.name);
    });
  };

  // Result table columns
  const columns = [
    {
      dataField: "id",
      text: "Person ID",
      sort: true,
    },
    {
      dataField: "firstname",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "lastname",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "birthdate",
      text: "DOB",
      sort: true,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
    },

    {
      dataField: "documents",
      text: "Documents",
      formatter: async (cellContent, row, rowIndex) => {
        console.log("cellContent:" + cellContent);
        console.log("row id:" + row.id);
        console.log("row index:" + rowIndex);

        return (
          <div>
            {/**
             * {docInfos &&
              docInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
             * 
             */}
            test
          </div>
        );
      },
    },
    {
      dataField: "action",
      text: "Action",
      formatter: (cellContent, row) => {
        return (
          <div>
            <div>
              <button onClick={() => handleDelete(row.id, row.name)}>
                <Trash />
              </button>

              <button onClick={() => handleEdit(row.id, row.name)}>
                <PenFill />
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="ms-3 me-3 mt-5">
      <div className="ms-3 me-3">
        <h4>People Add</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="form-group w-25 ">
              <label>First Name</label>
              <input
                name="firstname"
                type="text"
                {...register("firstname")}
                className={`form-control ${
                  errors.firstname ? "is-invalid" : ""
                }`}
              />
            </div>

            <div className="form-group w-25">
              <label>Last Name</label>
              <input
                name="lastname"
                type="text"
                {...register("lastname")}
                className={`form-control ${
                  errors.lastname ? "is-invalid" : ""
                }`}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group w-25">
              <label>Dob</label>
              <input
                name="birthdate"
                type="date"
                defaultValue={birthdate}
                {...register("birthdate")}
                className={`form-control ${
                  errors.birthdate ? "is-invalid" : ""
                }`}
              />
            </div>

            <div className="form-group w-25">
              <label>Gender</label>

              <select
                className="form-select"
                name="gender"
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          {/**  
           * <div className="row">
            <div className="form-group w-25">
              <label>Documents</label>
              <input
                type="file"
                name="documents"
                multiple
                onChange={handleOnChange}
                {...register("documents")}
                className={`form-control`}
              />
            </div>
          </div>
          */}

          <div className="row">
            <div className="form-group w-50">
              <label>Documents</label>
              <FileUploadEx
                key={fileUploadRerenderKey}
                callback={uploadCallback}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group w-25 mt-3 ">
              <button type="submit" className="btn btn-primary">
                Add Person
              </button>
              <button
                type="button"
                onClick={reset}
                className="btn btn-warning float-right"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr></hr>
      <div className="ms-3 me-3">
        <h4>People List</h4>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={people}
          columns={columns}
        />
      </div>
      <div className="modal-dialog modal-sm">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, person data has been saved.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <PeopleEdit
          show={modalShow}
          person={person}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default PeopleAdd;
