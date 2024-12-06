function Dashboard({lists}) {
    
    return (
      <div>
        <h1>ToDo App</h1>
        <div className="lists-container">
          {lists.map(list => (
            <div className="list" key={list.id}>{list.listName}</div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Dashboard;