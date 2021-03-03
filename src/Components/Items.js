import React from "react";
import Item from "../Components/Item";

function Items(props) {
  return (
    <ul className="todo-out__items">
      {props.todoList.map((item) => {
        return (
          <Item
            key={item.id}
            todoList={props.todoList}
            item={item}
            deleteHandler={props.deleteHandler}
            checkboxHandler={props.checkboxHandler}
            editModeHandler={props.editModeHandler}
            itemInputChangeHandler={props.itemInputChangeHandler}
            itemInputEditModeChangeHandler={props.itemInputEditModeChangeHandler}
          />
        );
      })}
    </ul>
  );
}

export default Items;
