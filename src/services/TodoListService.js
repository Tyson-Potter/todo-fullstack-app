async function fetchLists() {
  try {
    const response = await fetch(
      "https://advanced-todo-f2vy.onrender.com/api/lists/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lists:", error);
  }
}

async function addList(listName) {
  try {
    const response = await fetch(
      `https://advanced-todo-f2vy.onrender.com/api/lists/`,
      {
        method: "POST",
        body: JSON.stringify({ name: listName }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API Error:", err.message);
  }
}

async function addTodo(task, selectedList) {
  try {
    const response = await fetch(
      `https://advanced-todo-f2vy.onrender.com/api/lists/${selectedList._id}/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item.");
    }

    const data = await response.json();
  } catch (err) {
    console.error("API Error:", err.message);
  }
}
async function delteList(listId) {
  try {
    const response = await fetch(
      `https://advanced-todo-f2vy.onrender.com/api/lists/${listId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item.");
    }

    const data = await response.json();
  } catch (err) {
    console.error("API Error:", err.message);
  }
}
async function deleteToDo(listId, itemId) {
  try {
    const response = await fetch(
      `https://advanced-todo-f2vy.onrender.com/api/lists/${listId}/todos/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item.");
    }

    const data = await response.json();
  } catch (err) {
    console.error("API Error:", err.message);
  }
}

async function toggleCompleted(listId, itemId, newStatus) {
  try {
    const response = await fetch(
      `https://advanced-todo-f2vy.onrender.com/api/lists/${listId}/todos/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: newStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item.");
    }

    const data = await response.json();
  } catch (err) {
    console.error("API Error:", err.message);
  }
}

export { fetchLists, addList, addTodo, delteList, deleteToDo, toggleCompleted };
