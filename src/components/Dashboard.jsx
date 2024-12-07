import List from "./List";
import { useState } from "react";

function Dashboard({ lists, user }) {
  const [selectedList, setSelectedList] = useState(null);

  const changeSelectedList = (list) => {
    if (!selectedList) {
      setSelectedList(list);
    }
  };

  return (
    <div>
      <h1>ToDo App</h1>

      {selectedList ? (
        <List key={selectedList.id} list={selectedList} />
      ) : (
        <div className="lists-container">
          {lists.map((list) => (
            <div key={list.id} onClick={() => changeSelectedList(list)}>
              <List list={list} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
