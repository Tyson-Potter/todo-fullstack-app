import FilterBox from "./FilterBox";
import ListItem from "./ListItem";
import { useState } from "react";
import { fetchLists, addTodo } from "../services/TodoListService";

function SelectedListView({ setSelectedList, selectedList, setLists }) {
  const [addToDoItemPanel, setAddToDoItemPanel] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="selected-list-view">
      <FilterBox filter={filter} setFilter={setFilter} />
      <button onClick={() => changeSelectedList()}>Back To Other Lists</button>
      <div className="selected-list-name">{selectedList.name}</div>
      <div className="todos-container">
        {selectedList.todos
          .filter((todo) => {
            if (filter === "all") {
              return true;
            } else if (filter === "pending") {
              return !todo.completed;
            } else if (filter === "completed") {
              return todo.completed;
            }
          })
          .map((todo) => (
            <ListItem
              key={todo._id}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              itemContent={todo.task}
              id={todo.id}
              item={todo}
              setLists={setLists}
            />
          ))}
        {addToDoItemPanel ? (
          <div>
            <input
              type="text"
              placeholder="Enter your task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={() => handleAddItem(inputValue)}>Add</button>
            <button onClick={() => handleAddToDoItemCancel()}>Cencel</button>
          </div>
        ) : (
          <div className="" onClick={() => handleToggleAddTodoItemPane()}>
            <img
              src="/assets/PlusSignCircleAdd.svg"
              alt="Toggle Completed"
              width="24"
              height="24"
            />
          </div>
        )}
      </div>
    </div>
  );
  function changeSelectedList() {
    setSelectedList(null);
  }
  function handleAddToDoItemCancel() {
    setAddToDoItemPanel(false);
  }
  function handleToggleAddTodoItemPane() {
    setAddToDoItemPanel(true);
  }

  async function handleAddItem(taskName) {
    console.log("inputValue", taskName);
    if (taskName.length < 1) {
      return;
    }
    await addTodo(taskName, selectedList);

    setAddToDoItemPanel(false);
    setInputValue("");
    let lists = await fetchLists();
    const updatedList = lists.find((list) => list._id === selectedList._id);
    if (updatedList) {
      setSelectedList(updatedList);
    }
  }
}

export default SelectedListView;
