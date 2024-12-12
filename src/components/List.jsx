function List({ list, setSelectedList, handleDeleteList }) {
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
