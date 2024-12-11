
import ListItem from "./ListItem";
function SelectedListView({ setSelectedList, selectedList }) {
    return (
        <div className="selected-list-view">
            <button onClick={() => changeSelectedList()}>Back To Other Lists</button>
            <div className="selected-list-name">{selectedList.name}</div>
            <div className="todos-container">


                {selectedList.todos.map((todo) => (
                    <ListItem key={todo.id}
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
                        itemContent={todo.task}
                        id={todo.id}
                        item={todo}

                    />
                ))}
            </div>
        </div>



    );
    function changeSelectedList() {
        setSelectedList(null);

    };
}

export default SelectedListView;
