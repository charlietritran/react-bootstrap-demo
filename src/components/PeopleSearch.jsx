import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Trash, PenFill } from "react-bootstrap-icons";

import "bootstrap-icons/font/bootstrap-icons.css";
import ActionConfirmPopup from "../common/ActionConfirmPopup.js";
import NotificationPopup from "../common/NotificationPopup.js";

// SERVICES
import PeopleService from "../services/PeopleService.js";
import PeopleEdit from "./PeopleEdit.jsx";

/** /////////////////////////////////////////////////////////////////
 * COMPONENT: People Search
 *
 * PURPOSE: Search people by key and provide manipulattion of records
 *
 * @returns
 *
 *
 */ ////////////////////////////////////////////////////////////////
const PeopleSearch = () => {
  // rest service
  const peopleService = new PeopleService();

  // records
  const [people, setPeople] = useState([]); // for table
  const [person, setPerson] = useState([]); // for single row event

  // modal flags
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelConfirm, setShowModalDelConfirm] = useState(false);
  const [showModalDelResult, setShowModalDelResult] = useState(false);

  /**
   * INITIALLY EXECUTE BY DEFAULT AT PAGE REANDER
   */
  useEffect(() => {
    loadPeople();
  }, []); // Add empty array to force it run only one time.  no repeat after render

  // DEFINE COLUMN HEADERS OR TABLE
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
    ,
    {
      dataField: "documents",
      text: "Documents",
      formatter: (cellContent, row) => {
        return (
          <div>
            <div>{cellContent}</div>
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

  /**
   * HANDLE SELECT ROW EVENT
   */
  /*const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(row.id);
      console.log(isSelect);
      console.log(rowIndex);
      console.log(e);
    },
  };*/

  /**
   * LOAD PEOPLE LIST
   */
  const loadPeople = () => {
    peopleService.getPeople().then((result) => {
      console.log(result.data);

      if (result.data) {
        result.data.forEach((element) => {
          // build htmp tags data for documents
          if (element) {
            const files = element.documents.split(",");

            const docs = files.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.split("|")[1]}>{file.split("|")[0]}</a>
              </li>
            ));
            element.documents = docs;
          }
        });
      }

      setPeople(result.data);
    });
  };

  /**
   * Load current selected record into var
   * @param {*} id
   */
  const loadPerson = async (id) => {
    console.log("LOAD PERSON - owId:" + id);
    await peopleService.getPersonById(id).then((result) => {
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

      loadPeople();

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
   * HANDLE EDIT BUTTON
   * @param {} rowId
   * @param {*} name
   */
  const handleEdit = (rowId, name) => {
    //console.log("ROW-ID:" + rowId);
    loadPerson(rowId);
    setShowModalEdit(true);
    //1 YourCellName
  };

  return (
    <div className="ms-3 me-3 mt-5">
      <div className="ms-3 me-3">
        {/** ////////////////////////////////////////// */}
        {/** PEOPLE LIST */}
        {/** ////////////////////////////////////////// */}
        <h4>People Search</h4>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={people}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
      </div>
      {/** ////////////////////////////////////////// */}
      {/** EDIT DIALOG */}
      {/** ////////////////////////////////////////// */}
      <div>
        <PeopleEdit
          show={showModalEdit}
          person={person}
          fn={person.firstname}
          onHide={() => {
            loadPeople();
            setShowModalEdit(false)}}
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
          type={"Success"}
        />
      </div>
    </div>
  );
};

export default PeopleSearch;
