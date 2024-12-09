import React from "react";

function ListItem({
  itemContent,
  id,
  item,
  selectedList,
  setSelectedList
}) {
  return (

    <div className="list-item">
      <div className="list-item-component" onClick={() => handleToggleCompleted(item._id, item.completed)}>
        <img
          src={item.completed ? "src/assets/GreenCheckmark.svg" : "src/assets/CircleOutline.svg"}
          alt="Toggle Completed"
          width="24"
          height="24"
        />
      </div>
      <div className="Task-name">{itemContent}</div>
      <div className="list-item-component " onClick={() => handleEditItem(id)}>
        <img
          src="src/assets/EditButton.svg"
          alt="Edit"
          width="24"
          height="24"
        />
        <div className="list-item-component" onClick={() => handleDeleteTodoItem(item._id)}>
          <img
            src="src/assets/CancelButton.svg"
            alt="Delete"
            width="24"
            height="24"
          />
        </div>
      </div>

    </div>
  );

  async function handleDeleteTodoItem(itemId) {


    try {
      const response = await fetch(`http://localhost:3000/api/lists/${selectedList._id}/todos/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update item.");
      }

      const data = await response.json();
      //add reloading of the ui 

      console.log("API Response:", data);
    } catch (err) {
      console.error("API Error:", err.message);
    }
  }

  async function handleToggleCompleted(itemId, status) {
    let newStatus = false;
    if (!status) {
      newStatus = true
    } else {
      newStatus = false;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/lists/${selectedList._id}/todos/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "completed": newStatus }),

      });

      if (!response.ok) {
        throw new Error("Failed to update item.");
      }

      const data = await response.json();
      //add reloading of the ui 

      console.log("API Response:", data);
    } catch (err) {
      console.error("API Error:", err.message);
    }
  }



}

export default ListItem;
