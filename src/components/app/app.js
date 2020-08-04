import React, { Component } from "react";
import "./app.css";
import Modal from "../modal";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: [
        {
          card_id: 1,
          className: "red",
          id: 1,
          is_open: false, // открытый цвет ячейки
          hide: false,  // удалена ли ячейка
        },
        {
          card_id: 2,
          className: "yellow",
          id: 2,
          is_open: false,
          hide: false,
        },
        {
          card_id: 3,
          className: "blue",
          id: 3,
          is_open: false,
          hide: false,
        },
        {
          card_id: 4,
          className: "gray",
          id: 4,
          is_open: false,
          hide: false,
        },
        {
          card_id: 3,
          className: "blue",
          id: 5,
          is_open: false,
          hide: false,
        },
        {
          card_id: 1,
          className: "red",
          id: 6,
          is_open: false,
          hide: false,
        },
        {
          card_id: 5,
          className: "violet",
          id: 7,
          is_open: false,
          hide: false,
        },
        {
          card_id: 4,
          className: "gray",
          id: 8,
          is_open: false,
          hide: false,
        },
        {
          card_id: 6,
          className: "black",
          id: 9,
          is_open: false,
          hide: false,
        },
        {
          card_id: 7,
          className: "pink",
          id: 10,
          is_open: false,
          hide: false,
        },
        {
          card_id: 8,
          className: "green",
          id: 11,
          is_open: false,
          hide: false,
        },
        {
          card_id: 7,
          className: "pink",
          id: 12,
          is_open: false,
          hide: false,
        },
        {
          card_id: 5,
          className: "violet",
          id: 13,
          is_open: false,
          hide: false,
        },
        {
          card_id: 2,
          className: "yellow",
          id: 14,
          is_open: false,
          hide: false,
        },
        {
          card_id: 6,
          className: "black",
          id: 15,
          is_open: false,
          hide: false,
        },
        {
          card_id: 8,
          className: "green",
          id: 16,
          is_open: false,
          hide: false,
        },
      ],
      prev_cardId: null, // индекс по совпадению цветов
      prev_id: null,
      counter: 1, // счетчик кликов по ячейкам 
      round: 1,
      fixed: true, // относится к стилям
      error: false,
    };
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick = (item) => {
    item.is_open = true;
    this.checkItem(item); // проверка item на
    this.setState({
      error: true,
    });

    if (this.state.prev_id !== item.id && this.state.counter >= 2) {
      this.resetCounter(item);
      this.updateRound(item);
      this.setState({
        error: false,
        prev_cardId: null,
        prev_id: null
      });
    } 
    if (this.state.counter >= 2) {
      this.showColor();
    }
  };

  updateRound(item) {

    if (this.state.prev_id !== item.id) {
      this.setState((prevState) => {
        return { round: prevState.round + 1 };
      });
    }
    window.setTimeout(() => {
      this.setState({
        fixed: true,
      });
    }, 600);
  }

  showColor = () => {
    window.setTimeout(() => {
      this.state.squares.forEach((element) => {
        element.is_open = false;
      });
    }, 20);

    this.setState({
      fixed: false,
    });
  };


  checkItem = (item) => {
    this.setState({
      prev_cardId: item.card_id,
      prev_id: item.id,
    });
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));

    if (
      item.card_id === this.state.prev_cardId &&
      item.id !== this.state.prev_id
    ) {
      this.state.squares.forEach((element) => {
        for (let key in element) {
          if (key === "card_id") {
            if (element[key] === this.state.prev_cardId) {
              window.setTimeout(() => {
                element.hide = true;
              }, 20);
            }
          }
        }
      });
    } else if (this.state.prev_id === item.id) {
      this.setState({
        error: true,
      });
    }
  };

  resetCounter = (item) => {
    this.setState({
      counter: 1,
    });
  };

  render() {
    const squaresItem = this.state.squares.map((item, index) => {
      const styles = {
        close: {
          backgroundColor: "white",
          border: "1px solid black",
        },
        open: {
          backgroundColor: item.className,
          border: "1px solid black",
        },
        hide: {
          border: "none",
        },
      };
      return (
        <div
          style={
            item.hide ? styles.hide : item.is_open ? styles.open : styles.close
          }
          id={this.props.id}
          key={index}
          is_open={this.props.is_open}
          onClick={() => {
            this.handlerClick(item);
          }}
        ></div>
      );
    });
    return (
      <div className="content-wrap">
        <Modal
          round={this.state.round}
          fixed={this.state.fixed}
          error={this.state.error}
        />
        <div className="content">{squaresItem}</div>
      </div>
    );
  }
}
