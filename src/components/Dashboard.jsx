import List from "./List";
import { useState } from "react";
import SelectedListView from "./SelectedListView";
function Dashboard({ lists, selectedList, setSelectedList, setLists }) {
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
      )}
    </div>
  );
}

export default Dashboard;
