import React, { useState , useEffect} from "react";
import Button from "react-bootstrap/Button";

import { Container, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


/** /////////////////////////////////////////////////////////////////
 * COMPONENT: Home
 *
 * PURPOSE:
 *
 * @returns
 *
 *
 */ ////////////////////////////////////////////////////////////////
const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [firstname, setFirstname] = useState("aaa");

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

  useEffect(() => {
    console.log("USE-EFFECT IS CALLED ");
    

  }, []); // Add empty array to force it run only one time.  no repeat after render


  return (
    <>
      <h2>Home Page</h2>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!

        <Container>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group w-50 ">
                  <label>First Name</label>
                  <input
                    name="firstname"
                    type="text"
                    value = {firstname}
                    onChange={onChangeFirstname}

                  />
                </div>

               </div>
              
            </form>
          </div>
        </Container>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
