import React, { useState, useEffect, useRef } from "react";
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


  console.log("PEOPLE EDIT IS ACCESSED:" + JSON.stringify(props.person));

  //let person = JSON.parse(props.person);
  //let fn = person.firstname;
  console.log("PEOPLE EDIT IS ACCESSED:" + props.fn);



  const [firstname, setFirstname] = useState("");
  const firstnameRef = useRef();
  firstnameRef.current = props.person.firstname;
  

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),

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
    
    
  };

  function onChangeFirstname (e)  {
    console.log("ONCHANGE:" + e.target.value)
    setFirstname(e.target.value);
  };


  //loadInitData();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("USE-EFFECT IS CALLED " );
    //setFirstname(person.firstname)

    //loadInitData();
  }, []); // Add empty array to force it run only one time.  no repeat after render

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter">
    <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!

        <Container>
          <div> 
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
              FN:{firstnameRef.current}
                <div className="form-group w-50 ">
                  <label>First Name</label>
                  <input
                    name="firstname"
                    type="text"
                    defaultValue={firstnameRef.current}
                    onChange={onChangeFirstname}


                  />
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

export default PeopleEdit;
