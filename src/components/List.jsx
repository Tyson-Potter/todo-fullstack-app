function List({ list, selectedList, setSelectedList }) {
  return (
    <div onClick={() => changeSelectedList(list)} className="list-container">
      <img
        src="src/assets/Checklist_Black.svg"
        alt="Delete"
        width=""
        height="24"
        className="todo-list-svg"
      />
      <div className="list-name">{list.name}</div>

      <div className="list-created">{formatDate(list.createdAt)}</div>
    </div>
  );
  function changeSelectedList(list) {
    console.log(list);
    if (list) {
      setSelectedList(list);
    } else {
      setSelectedList(null);
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
