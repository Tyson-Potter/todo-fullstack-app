import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "../src/components/Dashboard";


function App() {

  const [lists, setLists] = useState([]);


  useEffect(() => {

    const fetchLists = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/lists/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLists(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div className="App">

      <Dashboard lists={lists} />

    </div>
  );
}

export default App;
