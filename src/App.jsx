import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "../src/components/Dashboard";

function App() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch(
          "https://advanced-todo-f2vy.onrender.com/api/lists/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLists(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div className="App">
      <Dashboard
        setLists={setLists}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        lists={lists}
      />
    </div>
  );
}

export default App;
