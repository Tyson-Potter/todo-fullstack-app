import FilterBox from "./FilterBox";
import ListItem from "./ListItem";
import { useState } from "react";
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
              key={todo.id}
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
              src={"src/assets/plusSignCircle.svg"}
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

  async function fetchLists() {
    try {
      const response = await fetch("http://localhost:3000/api/lists/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLists(data);
      const updatedList = data.find((list) => list._id === selectedList._id);
      if (updatedList) {
        setSelectedList(updatedList);
      }
      console.log(data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }
  async function handleAddItem(inputValue) {
    console.log("inputValue", inputValue);
    if (inputValue.length < 1) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/lists/${selectedList._id}/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: inputValue }),
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
    setAddToDoItemPanel(false);
    setInputValue("");
    fetchLists();
  }
}

export default SelectedListView;
