import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";



import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// SERVICES

import PeopleService from "../services/PeopleService.js";

const properties = {
  rowId: PropTypes.number,
};

const defaultProperties = {
  rowId: -1,
};

/** /////////////////////////////////////////////////////////////////
 * COMPONENT: People Add
 *
 * PURPOSE:
 *
 * @returns
 *
 *
 */ ////////////////////////////////////////////////////////////////
const PeopleEdit = (props) => {
  const peopleService = new PeopleService();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [documents, setDocuments] = useState("");

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

  /**
   * SUBMIT
   */
  const onSubmit = async (data) => {
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
      documents: data.documents[0].name,
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
        //setPeople(tempArr);
      });
      reset();
      //handleShow();
    }
  };

  //loadInitData();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("USE-EFFECT IS CALLED");
    //loadInitData();
  }, []); // Add empty array to force it run only one time.  no repeat after render

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          People Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group w-50 ">
                  <label>First Name</label>
                  <input
                    name="firstname"
                    type="text"
                    value={props.person.firstname}
                    {...register("firstname")}
                    className={`form-control ${
                      errors.firstname ? "is-invalid" : ""
                    }`}
                  />
                </div>

                <div className="form-group w-50">
                  <label>Last Name</label>
                  <input
                    name="lastname"
                    type="text"
                    value={props.person.lastname}
                    {...register("lastname")}
                    className={`form-control ${
                      errors.lastname ? "is-invalid" : ""
                    }`}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group w-50">
                  <label>Dob</label>
                  <input
                    name="birthdate"
                    type="date"
                    value={props.person.birthdate}
                    {...register("birthdate")}
                    className={`form-control ${
                      errors.birthdate ? "is-invalid" : ""
                    }`}
                  />
                </div>

                <div className="form-group w-50">
                  <label>Gender</label>

                  <select
                    className="form-select"
                    name="gender"
                    {...register("gender")}
                    value={props.person.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group w-75">
                  <label>Documents</label>
                  <input
                    type="file"
                    name="documents"
                    multiple
                    //onChange={handleOnChange}
                    {...register("documents")}
                    className={`form-control`}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group w-50 mt-3 ">
                  <button type="submit" className="btn btn-primary">
                    Update Person
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
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

PeopleEdit.propTypes = properties;
PeopleEdit.defaultProps = defaultProperties;
export default PeopleEdit;
