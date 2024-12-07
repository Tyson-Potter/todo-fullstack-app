import ListItem from "./ListItem";
function List({ list }) {
  return (
    <div className="list">
      <div>{list.listName}</div>

      {list.items.map((item) => (
        <ListItem
          className="list-item"
          key={item.id}
          itemContent={item.content}
          itemState={item.currentState}
          listId={list.id}
        />
      ))}
    </div>
  );
}

export default List;
