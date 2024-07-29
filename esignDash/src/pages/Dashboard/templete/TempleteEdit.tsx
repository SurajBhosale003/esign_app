import React from 'react';
import { useLocation } from 'react-router-dom';
import Designer from "./pdfmeSupport/Designer";

interface TemplateUserDetails {
  name: string;
  templete_title: string;
  templete_owner_email: string;
  templete_owner_name: string;
  templete_created_at: string; // or Date if you prefer to handle it as a Date object
}

const TempleteEdit = () => {
  const location = useLocation();
  const { templete } = location.state as { templete?: TemplateUserDetails } || {};

  if (!templete) {
    return <div>No template data available</div>;
  }

  return (
    // <div>
    //   <h4>Name: {templete.name}</h4>
    //   <h4>Title: {templete.templete_title}</h4>
    //   <h4>Owner Email: {templete.templete_owner_email}</h4>
    //   <h4>Owner Name: {templete.templete_owner_name}</h4>
    //   <h4>Created At: {new Date(templete.templete_created_at).toLocaleString()}</h4>
    // </div>

    <>
    <Designer />
    </>
  );
};

export default TempleteEdit;
