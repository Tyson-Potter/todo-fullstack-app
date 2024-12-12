import List from "./List";
import { useState } from "react";
import SelectedListView from "./SelectedListView";
import { fetchLists, addList, delteList } from "../services/TodoListService";

function Dashboard({ lists, selectedList, setSelectedList, setLists }) {
  const [newListNameInput, setNewListNameInput] = useState("");

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

  async function handleAddingList(newListName) {
    await addList(newListName);
    const lists = await fetchLists();
    setLists(lists);
    setNewListNameInput("");
  }
  async function handleDeleteList(listId) {
    await delteList(listId);
    const lists = await fetchLists();
    setLists(lists);
  }
}

export default Dashboard;
