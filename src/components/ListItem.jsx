import React from "react";

function ListItem({ itemContent, itemState, listId }) {
  return (
    <div className="list-item">
      <p>
        <strong>Content:</strong> {itemContent}
      </p>
      <p>
        <strong>Status:</strong> {itemState}
      </p>
      <p>
        <strong>List ID:</strong> {listId}
      </p>
    </div>
  );
}

export default ListItem;
