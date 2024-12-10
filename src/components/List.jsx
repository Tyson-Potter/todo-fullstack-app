import ListItem from "./ListItem";
function List({ list, user, setUser, selectedList }) {
  return (
    <div className="list">
      <h1>{list.listName}</h1>

      {list.items.map((item) => (
        <ListItem
          user={user}
          className="list-item"
          itemContent={item.content}
          itemState={item.currentState}
          id={item.id}
          listId={list.id}
          setUser={setUser}
          selectedList={selectedList}
        />
      ))}
    </div>
  );
  function handleAddingListItem(itemContent, listId, userId) {
    //add api call to change item from database  TODO
    //do call to go get new user object and reload the page
  }
}

export default List;
