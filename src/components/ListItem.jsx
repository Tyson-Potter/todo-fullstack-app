import React from "react";
import {
  deleteToDo,
  fetchLists,
  toggleCompleted,
} from "../services/TodoListService";
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
        className=" list-item-checkbox"
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
      <div className="task-name">{itemContent}</div>

      <div
        className="list-item-component"
        onClick={() => handleDeleteTodoItem(selectedList._id, item._id)}
      >
        <img
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
    let newStatus = false;
    if (!status) {
      newStatus = true;
    } else {
      newStatus = false;
    }

    await toggleCompleted(selectedList._id, itemId, newStatus);

    const data = await fetchLists();
    setLists(data);
    const updatedList = data.find((list) => list._id === selectedList._id);
    if (updatedList) {
      setSelectedList(updatedList);
    }
  }
}

export default ListItem;
