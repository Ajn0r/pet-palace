import React from "react";
import Dropdown from "react-bootstrap/Dropdown";



const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v ml-3"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));
  
  export const DropDownManage = ({ handleEdit, handleDelete }) => {
    return (
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={ThreeDots} />
  
        <Dropdown.Menu
          className="text-center mx-auto"
          popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item
            className={`d-inline p-1 p-md-2 `}
            onClick={handleEdit}
            aria-label="edit"
          >
            <i className="fas fa-edit" />
          </Dropdown.Item>
          <Dropdown.Item
            className={`d-inline p-1 p-md-2 `}
            onClick={handleDelete}
            aria-label="delete"
          >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };