import List from "./List";
import { useState, useEffect } from "react";
import SelectedListView from "./SelectedListView";
import { fetchLists, addList, delteList } from "../services/TodoListService";

function Dashboard() {
  const [newListNameInput, setNewListNameInput] = useState("");
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  useEffect(() => {
    getLists();
  }, []);
  return (
    <div>
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
              <button onClick={() => handleAddingList(newListNameInput)}>
                Add List
              </button>
              <input
                className="create-new-list-input"
                type="text"
                placeholder="Enter New List Name"
                value={newListNameInput}
                onChange={(e) => setNewListNameInput(e.target.value)}
              />
            </div>
          </>
          <div className="lists-container">
            {lists.map((list) => (
              <List
                setLists={setLists}
                list={list}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                handleDeleteList={handleDeleteList}
                key={list._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
  async function getLists() {
    const lists = await fetchLists();
    setLists(lists);
  }
  async function handleAddingList(newListName) {
    if (newListName.length === 0) {
      alert("List name cannot be empty");
    } else {
      await addList(newListName);
      const lists = await fetchLists();
      setLists(lists);
      setNewListNameInput("");
    }
  }
  async function handleDeleteList(listId) {
    await delteList(listId);
    const lists = await fetchLists();
    setLists(lists);
  }
}

export default Dashboard;
