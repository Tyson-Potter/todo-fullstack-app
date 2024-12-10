import { useState } from "react";
import "./App.css";
import Dashboard from "../src/components/Dashboard";
import Login from "../src/components/Login";

function App() {
  // later add checking local storage for user otherwise set to null
  //fake data
  const [user, setUser] = useState({
    name: "Tyson",
    lists: [
      {
        listName: "list1",
        id: "h5eh5sh5shs5h",
        items: [
          {
            id: "a1b2c3d4e5",
            content: "Buy groceries",
            currentState: "pending",
          },
          {
            id: "lololololo",
            content: "Buy food",
            currentState: "pending",
          },
          { id: "f6g7h8i9j0", content: "Call mom", currentState: "completed" },
        ],
      },
      {
        listName: "list2",

        id: "48fj429f8j4f",
        items: [
          {
            id: "k1l2m3n4o5",
            content: "Finish project",
            currentState: "pending",
          },
          {
            id: "p6q7r8s9t0",
            content: "Book flight tickets",
            currentState: "completed",
          },
        ],
      },
    ],
  });

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} setUser={setUser} lists={user.lists} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
