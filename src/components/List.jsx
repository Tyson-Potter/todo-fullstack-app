function List({ list, setLists, selectedList, setSelectedList }) {
  return (
    <>
      <></>
      <div className="list-container">
        <button
          onClick={() => handleDeleteList(list._id)}
          className="delete-list-button"
        >
          X
        </button>
        <img
          onClick={() => changeSelectedList(list)}
          src="/assets/Checklist_Black.svg"
          alt="Delete"
          width="24"
          height="24"
          className="todo-list-svg"
        />
        <div onClick={() => changeSelectedList(list)} className="list-name">
          {list.name}
        </div>
        <div onClick={() => changeSelectedList(list)} className="list-created">
          {formatDate(list.createdAt)}
        </div>
      </div>
    </>
  );
  function changeSelectedList(list) {
    console.log(list);
    if (list) {
      setSelectedList(list);
    } else {
      setSelectedList(null);
    }
  }
  async function handleDeleteList(listId) {
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

      console.log("API Response:", data);
    } catch (err) {
      console.error("API Error:", err.message);
    }
    fetchLists();
  }
  async function fetchLists() {
    try {
      const response = await fetch(
        "https://advanced-todo-f2vy.onrender.com/api/lists/"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedList(null);
      setLists(data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
}

export default List;
