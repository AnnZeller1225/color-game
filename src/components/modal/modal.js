import React, { Component } from "react";
import "./modal.css";

export default class Modal extends Component {

  render() {
      let error = this.props.error;
      let text = "кликните на еще одну ячейку";
      let round;
      if (error) {
        round = " раунд № " + this.props.round + " " + text
      } else {
     round = " раунд № " + this.props.round; 
      }
   

    let fixed = this.props.fixed;
    let styles = {
      fix: {
         animation: "go 0.2s",
      },

      un_fix: {
       animation: "go 0.2s",
        display: "none"
      },
    };
  
    return (
      <span className="modal" style={fixed ? styles.fix : styles.un_fix}>
        <p className="modal-window">{round}</p>     
      </span>
    );
  }
}
