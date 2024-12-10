import List from "./List";
import { useState } from "react";

function Dashboard({ lists, user, setUser }) {
  const [selectedList, setSelectedList] = useState(null);

  const changeSelectedList = (list) => {
    if (list) {
      setSelectedList(list);
    } else {
      setSelectedList(null);
    }
  };

  return (
    <div>
      <h1>ToDo App</h1>

      {selectedList ? (
        <>
          <div key={selectedList.id}>
            <List
              selectedList={selectedList}
              list={selectedList}
              setUser={setUser}
              user={user}
            />
          </div>
          <button onClick={() => changeSelectedList(null)}>Back</button>
        </>
      ) : (
        <div className="lists-container">
          {lists.map((list) => (
            <>
              <List list={list} setUser={setUser} user={user} />
              <button onClick={() => changeSelectedList(list)}>View</button>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
