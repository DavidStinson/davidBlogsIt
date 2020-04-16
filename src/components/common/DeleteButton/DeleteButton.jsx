import React from "react";

const DeleteButton = ({ itemId, label, api, doDelete }) => {
  async function handleDelete(itemId, api) {
    await api.deleteOne(itemId);
    doDelete(itemId);
  };

  return ( 
    <button
      className="btn btn-danger"
      onClick={() => handleDelete(itemId, api)}
    >
      {label}
    </button>
  );
}
 
export default DeleteButton;
