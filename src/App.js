import React from "react";
import "./App.css";
import Items from "./Components/Items";
import Input from "./Components/Input";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      inputValue: "",
    };
    this.state.todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoList !== this.state.todoList) {
      localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
    }
  }

  //Enter text on main input
  mainInputTextChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  //Add element Todo
  addTodo = (text) => {
      this.setState({
        todoList: [
          ...this.state.todoList,
          {
            id: Date.now(),
            text: text,
            completed: false,
            edit: false,
          },
        ],
      });
  };

  //Change checkbox
  checkboxToggle = (id) => {
    this.state.todoList.forEach((elem) => {
      if (elem.id === id) {
        elem.completed = !elem.completed;
        this.setState({
          todoList: [...this.state.todoList],
        });
      }
    });
  };

  //Delete Todo elemet
  deleteItem = (id) => () => {
    this.setState({
      todoList: [...this.state.todoList.filter((elem) => elem.id !== id)],
    });
  };

  //Show / Hide input for edit element todo on Double Click
  itemEditModeToggleOnDblClick = (id) => () => {
    this.state.todoList.forEach((elem) => {
      if (elem.id === id) {
        elem.edit = !elem.edit;
        this.setState({
          todoList: [...this.state.todoList],
        });
      }
    });
  };

  //Edit text in element Todo
  itemInputChangeText = (id) => (text) => {
    this.state.todoList.forEach((elem) => {
      if (elem.id === id ) {
        if (text.trim() !== '') {
          elem.text = text;
          elem.edit = !elem.edit;
          this.setState({
            todoList: [...this.state.todoList],
          });
        } else {
          elem.edit = !elem.edit;
          this.setState({
            todoList: [...this.state.todoList],
          });
        }
 
      } 
    });
  };

  render() {
    return (
      <div className="todo">
        <h1>Todo</h1>
        <Input
          className="todo__input"
          placeholder="Введите название дела"
          onChange={this.mainInputTextChange}
          onEnter={this.addTodo}
        />
        <p className="todo-out__title">
          {this.state.todoList.length > 0
            ? "Список дел:"
            : "Запланируй что-то)"}
        </p>
        <Items
          todoList={this.state.todoList}
          deleteItem={this.deleteItem}
          checkboxToggle={this.checkboxToggle}
          itemEditModeToggleOnDblClick={this.itemEditModeToggleOnDblClick}
          itemInputChangeText={this.itemInputChangeText}
        />
      </div>
    );
  }
}

export default App;
