import React from "react";
import "./App.css";
import Items from "./Components/Items";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      inputValue: "",
    };
    this.state.todoList = JSON.parse(localStorage.getItem("todoList") || '[]');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoList !== this.state.todoList){
      localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
    }
    console.log('dsadsa')
  }

  inputTextChangeHandler = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  checkboxHandler = (id) => {
    this.state.todoList.forEach((elem) => {
      if (elem.id === id) {
        elem.completed = !elem.completed;
        this.setState({
          todoList: [...this.state.todoList],
        });
      }
    });
  };

  keyDownHandler = (event) => {
    if (event.key === "Enter" && this.state.inputValue.trim() !== '') {
      this.setState({
        todoList: [
          ...this.state.todoList,
          {
            id: Date.now(),
            text: this.state.inputValue,
            completed: false,
            edit: false
          },
        ],
      });
      this.setState({ inputValue: "" });
      console.log(this.state);
    }
  };

  deleteHandler = (id) => {
    this.setState({
      todoList: [...this.state.todoList.filter((elem) => elem.id !== id)],
    });
  };

  editModeHandler = (id) => {
    this.state.todoList.forEach((elem) => {
      if (elem.id === id) {
        elem.edit = !elem.edit;
        this.setState({
          todoList: [...this.state.todoList],
        });
      }
    });
  }

  itemInputChangeHandler = (id, event) => {
    this.state.todoList.forEach((elem) => {
      if (elem.id === id) {
        elem.text = event.target.value;
        this.setState({
          todoList: [...this.state.todoList],
        });
      }
    });
  }

  itemInputEditModeChangeHandler = (event, id, text) => {
    if (event.key === "Enter" && text.trim() !== '') {
      this.state.todoList.forEach((elem) => {
        console.log(elem.edit)
        if (elem.id === id) {
          elem.edit = !elem.edit;
          this.setState({
            todoList: [...this.state.todoList],
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="todo">
        <h1>Todo</h1>
        <input
          className="todo__input"
          type="text"
          placeholder="Введите название дела"
          value={this.state.inputValue}
          onChange={this.inputTextChangeHandler}
          onKeyDown={this.keyDownHandler}
        />
        <p className="todo-out__title">
          {this.state.todoList.length > 0
            ? "Список дел:"
            : "Запланируй что-то)"}
        </p>
        <Items
          todoList={this.state.todoList}
          deleteHandler={this.deleteHandler}
          checkboxHandler={this.checkboxHandler}
          editModeHandler={this.editModeHandler}
          itemInputChangeHandler={this.itemInputChangeHandler}
          itemInputEditModeChangeHandler={this.itemInputEditModeChangeHandler}
        />
      </div>
    );
  }
}

export default App;
