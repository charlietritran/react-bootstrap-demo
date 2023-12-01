import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import FileUpload from "./FileUpload";
import SolrVisualization from "./solr/SolrVisualization"
import ApiData from "./solr/ApiData";
import DocumentsSearch from "./solr/DocumentsSearch";

/** /////////////////////////////////////////////////////////////////
 * COMPONENT: SolrDemo
 *
 * PURPOSE:
 *
 * @returns
 *
 *
 */ ////////////////////////////////////////////////////////////////
const SolrDemo = () => {
  return (
    <div>
      <h1>Document Search</h1>
      <DocumentsSearch />
    </div>
    
  );
};

export default SolrDemo;
