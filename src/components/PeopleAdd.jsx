import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import { Trash, PenFill } from "react-bootstrap-icons";

// SERVICES
import PeopleService from "../services/PeopleService.js";

// COMPONENTS
import PeopleEdit from "./PeopleEdit";
import FileUploadEx from "./FileUploadEx";

// ACTIONS POPUP
import ActionConfirmPopup from "../common/ActionConfirmPopup.js";
import NotificationPopup from "../common/NotificationPopup.js";

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


  const [showModalDelConfirm, setShowModalDelConfirm] = useState(false);
  const [showModalDelResult, setShowModalDelResult] = useState(false);


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

    console.log("ON SUBMIT UPLOADED FILES ....", uploadFiles);

    // Call service to add  new entry to db
    const response = await peopleService.savePersonMultiModel(
      jsontxt,
      uploadFiles
    );

    console.log("SERVICE RETURN id:" + response.data.id);
    console.log("SERVICE RETURN firstname:" + response.data.firstname);

    // If success, notify and reset fields
    if (response.data) {
      let files = await peopleService.getDocs(response.data.id);
      if (files) {
        const docs = files.data.map((file, index) => (
          <li className="list-group-item" key={index}>
            <a href={file.url}>{file.name}</a>
          </li>
        ));
        response.data.documents = docs;
        var tempArr = [];
        tempArr.push(response.data);
        setPeople(tempArr);
      }
      reset();
      setFileUploadRerenderKey(Math.random()); // rerender fileupload by update component key
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
    peopleService.getPersonById(id).then((result) => {
      console.log(result.data);
      setPerson(result.data);
    });
  };

/**
   * HANDLE DELETE BUTTON
   * @param {*} rowId
   * @param {*} name
   */
  const handleDelete = (rowId, name) => {
    console.log("ROW-ID:" + rowId);
    loadPerson(rowId);
    setShowModalDelConfirm(true);
  };

  /**
   * PROCESS CONFIRM DELETE
   */
  const onConfirmDelete = () => {
    console.log("Confirm to delete now.");
    setShowModalDelConfirm(false);

    peopleService.deletePerson(person.id).then((result) => {
      console.log("Done delete person:" + result.data);

      setPeople([]);
      setShowModalDelResult(true);

    });
  };

  /**
   * HIDE DELETE RESULT NOTIFICATION
   */
  const hideModalDelResult = () => {
    setShowModalDelResult(false);
  };

  /**
   * HIDE DELETE CONFIRM
   */
  const hideModalDelConfirm = () => {
    setShowModalDelConfirm(false);
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
  const uploadCallback = (files) => {
    console.log("CALL BACK FROM UPLOADING ....", files);

    let temp = [];
    files.forEach((element) => {
      temp.push(element);
    });
    setUploadFiles(temp);


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
      formatter: (cellContent, row, rowIndex) => {
        console.log("cellContent:" + cellContent);
        console.log("row id:" + row.id);
        console.log("row index:" + rowIndex);

        return <div>{cellContent}</div>;
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

      {/** ////////////////////////////////////////// */}
      {/** CONFIRM DIALOG FOR DELETE */}
      {/** ////////////////////////////////////////// */}
      <div>
        <ActionConfirmPopup
          showModal={showModalDelConfirm}
          hideModal={hideModalDelConfirm}
          confirmModal={onConfirmDelete}
          id={"id"}
          type={"test"}
          message={"Are you sure you want to delete the record?"}
          title={"Delete Confirm"}
        />
      </div>
      {/** ////////////////////////////////////////// */}
      {/** ACTION RESULT NOTIFICATION */}
      {/** ////////////////////////////////////////// */}
      <div>
        <NotificationPopup
          showModal={showModalDelResult}
          hideModal={hideModalDelResult}
          message={"Delettion is completed."}
          title={"Success"}
          type={"danger"}
        />
      </div>
    </div>
  );
};

export default PeopleAdd;
