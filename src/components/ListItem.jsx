import React, { useState } from "react";
import {
  deleteToDo,
  fetchLists,
  toggleCompleted,
  editToDo,
} from "../services/TodoListService";

function ListItem({
  itemContent,
  item,
  selectedList,
  setSelectedList,
  setLists,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(itemContent);

  return (
    <div className="list-item">
      <div
        className="list-item-checkbox"
        onClick={() => handleToggleCompleted(item._id, item.completed)}
      >
        <img
          src={
            item.completed
              ? "/assets/GreenCheckmark.svg"
              : "/assets/CircleOutline.svg"
          }
          alt="Toggle Completed"
          width="33"
          height="33"
        />
      </div>

      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="task-edit-input"
          />
          <button
            className="task-edit-button"
            onClick={() => handleEditTodo(item._id, editValue)}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="task-name">{itemContent}</div>
      )}

      {!isEditing && (
        <div className="list-item-component" onClick={() => setIsEditing(true)}>
          <img src="/assets/EditButton.svg" alt="Edit" width="24" height="24" />
        </div>
      )}

      <div className="list-item-component edit-button">
        <img
          onClick={() => handleDeleteTodoItem(selectedList._id, item._id)}
          src="/assets/CancelButton.svg"
          alt="Delete"
          width="24"
          height="24"
        />
      </div>
    </div>
  );

  async function handleDeleteTodoItem(listId, itemId) {
    await deleteToDo(listId, itemId);
    const data = await fetchLists();
    setLists(data);
    const updatedList = data.find((list) => list._id === selectedList._id);
    if (updatedList) {
      setSelectedList(updatedList);
    }
  }

  async function handleToggleCompleted(itemId, status) {
    const newStatus = !status;
    await toggleCompleted(selectedList._id, itemId, newStatus);

    const data = await fetchLists();
    setLists(data);
    const updatedList = data.find((list) => list._id === selectedList._id);
    if (updatedList) {
      setSelectedList(updatedList);
    }
  }

  async function handleEditTodo(itemId, newTaskName) {
    if (!newTaskName.trim()) return;
    await editToDo(selectedList._id, itemId, newTaskName);

    const data = await fetchLists();
    setLists(data);
    const updatedList = data.find((list) => list._id === selectedList._id);
    if (updatedList) {
      setSelectedList(updatedList);
    }
    setIsEditing(false);
  }
}

export default ListItem;
