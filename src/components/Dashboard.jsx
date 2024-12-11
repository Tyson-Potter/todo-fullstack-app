import List from "./List";
import { useState } from "react";
import SelectedListView from "./SelectedListView";
function Dashboard({ lists }) {
  const [selectedList, setSelectedList] = useState(null);



  return (
    <div>
      <h1>ToDo App</h1>

      {selectedList ? (


        <  SelectedListView className="selected-list-view" selectedList={selectedList} setSelectedList={setSelectedList} />
      ) : (
        <div className="lists-container">
          {lists.map((list) => (
            <>
              <List list={list} selectedList={selectedList} setSelectedList={setSelectedList} />

            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
