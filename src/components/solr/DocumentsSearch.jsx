import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// SERVICES
import SolrService from "../../services/SolrService.js";


/** /////////////////////////////////////////////////////////////////
 * COMPONENT: People Search
 *
 * PURPOSE: Search people by key and provide manipulattion of records
 *
 * @returns
 *
 *
 */ ////////////////////////////////////////////////////////////////
const DocumentsSearch = () => {
  // rest service
  const solrService = new SolrService();

  // records
  const [documents, setDocuments] = useState([]); // for table
  

  /**
   * INITIALLY EXECUTE BY DEFAULT AT PAGE REANDER
   */
  useEffect(() => {
      loadDocuments();
  }, []); // Add empty array to force it run only one time.  no repeat after render

  

  /**
   * LOAD PEOPLE LIST
   */
  const loadDocuments = () => {

    solrService.getDocuments().then((result) => {
      console.log(result.data);
      /*if (result.data) {
        result.data.response.docs.forEach((element) => {

          // build htmp tags data for documents
          if (element) {
            if(element.actions){
              console.log(element.actions)
              //const actions = element.actions.split(",");

              const htmlActions = element.actions.map((item, index) => (
                <li className="list-group-item" key={index}>
                  action
                </li>
              ));
              element.actions = htmlActions;
            }
            
          }

        });
      }*/
      setDocuments(result.data.response.docs);
    });
  }

   // DEFINE COLUMN HEADERS OR TABLE
   const columns = [
    {
      dataField: "last_indexed",
      text: "Last Indexed",
      sort: true
    },
    {
      dataField: "receipt_number",
      text: "Receipt Number",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <div>
            <div>{cellContent}</div>
          </div>
        );
      },
    }
  ];


  return (
    <div className="ms-3 me-3 mt-5">
      <div className="ms-3 me-3">
        {/** ////////////////////////////////////////// */}
        {/** PEOPLE LIST */}
        {/** ////////////////////////////////////////// */}
        <h4>Documents Search</h4>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={documents}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
        </div>
    </div>
  );
};

export default DocumentsSearch;
