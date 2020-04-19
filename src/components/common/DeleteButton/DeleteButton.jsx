import React from "react";

const DeleteButton = ({ itemId, label, api, doDelete }) => {
  async function handleDelete(itemId, api) {
    await api.deleteOne(itemId);
    doDelete(itemId);
  }

  return (
    <button
      className="ui inverted red right labeled icon button"
      onClick={() => handleDelete(itemId, api)}
    >
      {label}
      <i className="trash icon"></i>
    </button>
  );
};

export default DeleteButton;
