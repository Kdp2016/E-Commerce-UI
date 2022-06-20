import React from "react";

import { Button, ButtonGroup } from "@mui/material";



class GroupedButtons extends React.Component <{}, {counter: number}>{
  state = { counter: 0 };

  handleIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {     
    this.setState(state => ({ counter: state.counter - 1 }));
  };
  render() {
    const displayCounter = this.state.counter > 0;

    return (
      <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
        <Button onClick={this.handleIncrement}>+</Button>
        {displayCounter && <Button disabled>{this.state.counter}</Button>}
        {displayCounter && <Button onClick={this.handleDecrement}>-</Button>}
      </ButtonGroup>
    );
  }
}

export default GroupedButtons;
