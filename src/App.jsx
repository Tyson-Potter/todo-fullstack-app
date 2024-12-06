import { useState } from 'react';
import './App.css';
import Dashboard from '../src/components/Dashboard';
import Login from '../src/components/Login';

function App() {
    // later add checking local storage for user otherwise set to null
  const [user, setUser] = useState(({name:"Tyson", lists: [{listName:"list1",id:"h5eh5sh5shs5h"},{listName:"list2",id:"48fj429f8j4f"}] }));

  return (
  
    <div className="App">
      {user ? <Dashboard lists={user.lists} /> : <Login />}
    </div>
  );
}

export default App;