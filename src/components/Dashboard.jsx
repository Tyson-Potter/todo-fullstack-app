import List from "./List";
import { useState } from "react";
import SelectedListView from "./SelectedListView";

function Dashboard({ lists, selectedList, setSelectedList, setLists }) {
  const [input, setInput] = useState("");
  return (
    <div>
      <h1>ToDo App</h1>

      {selectedList ? (
        <SelectedListView
          lists={lists}
          className="selected-list-view"
          setLists={setLists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      ) : (
        <>
          <>
            <div className="create-new-list-container">
              <button onClick={() => handleAddingList(input)}>
                Create A New List
              </button>{" "}
              <input
                type="text"
                placeholder="Enter your task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </>
          <div className="lists-container">
            {lists.map((list) => (
              <>
                
                <List
                  setLists={setLists}
                  list={list}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
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
      setInput("");
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }
  async function handleAddingList(input) {
    try {
      const response = await fetch(
        `https://advanced-todo-f2vy.onrender.com/api/lists/`,
        {
          method: "POST",
          body: JSON.stringify({ name: input }),
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
}

export default Dashboard;
