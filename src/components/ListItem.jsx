import React from "react";

function ListItem({
  itemContent,
  itemState,
  id,
  listId,
  setUser,
  user,
  selectedList,
}) {
  return (
    <div className="list-item">
      {itemContent}

      <p>
        <strong>Status:</strong> {itemState}
      </p>
      {id}
      <button>O</button>
      <button onClick={() => handleDeleteTodoItem(id)}>X</button>
    </div>
  );
  function handleDeleteTodoItem(itemId) {
    //add api call to delete item from database  TODO
    //do call to go get new user object reload the page
  }
  function handleChangingStateOfItem(
    itemId,
    newState,
    listId,
    userId,
    fieldToChange
  ) {
    //add api call to change item from database  TODO
    //do call to go get new user object and reload the page
  }
}

export default ListItem;
