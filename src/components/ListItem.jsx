import React from "react";

function ListItem({
  itemContent,
  id,
  item,
  selectedList,
  setSelectedList,
  setLists,
}) {
  return (
    <div className="list-item">
      <div
        className="list-item-component"
        onClick={() => handleToggleCompleted(item._id, item.completed)}
      >
        <img
          src={
            item.completed
              ? "/assets/GreenCheckmark.svg"
              : "/assets/CircleOutline.svg"
          }
          alt="Toggle Completed"
          width="24"
          height="24"
        />
      </div>
      <div className="Task-name">{itemContent}</div>

      <div
        className="list-item-component"
        onClick={() => handleDeleteTodoItem(item._id)}
      >
        <img src="/assets/CancelButton.svg" alt="Delete" width="24" height="24" />
      </div>
    </div>
  );

  async function handleDeleteTodoItem(itemId) {
    try {
      const response = await fetch(
        `https://advanced-todo-f2vy.onrender.com/api/lists/${selectedList._id}/todos/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item.");
      }

      const data = await response.json();

      console.log("API Response:", data);
    } catch (err) {
      console.error("API Error:", err.message);
    }
    fetchLists();
  }

  async function handleToggleCompleted(itemId, status) {
    let newStatus = false;
    if (!status) {
      newStatus = true;
    } else {
      newStatus = false;
    }

    try {
      const response = await fetch(
        `https://advanced-todo-f2vy.onrender.com/api/lists/${selectedList._id}/todos/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item.");
      }

      const data = await response.json();

      console.log("API Response:", data);
    } catch (err) {
      console.error("API Error:", err.message);
    }
    fetchLists();
  }

  async function fetchLists() {
    try {
      const response = await fetch(
        "https://advanced-todo-f2vy.onrender.com/api/lists/"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLists(data);
      const updatedList = data.find((list) => list._id === selectedList._id);
      if (updatedList) {
        setSelectedList(updatedList);
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }
}

export default ListItem;
