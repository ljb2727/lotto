import React, { Component } from "react";

import "./style.css";

class Control extends Component {
    render() {
        return (
            <div>
                <input
                    type="button"
                    value="재도전?"
                    onClick={this.props.onClick}
                />
            </div>
        );
    }
}
class App extends Component {
    state = {
        ary: [1, 2, 3, 4, 5, 6],
        open: false,
        myCount: 3,
        rest: [],
        target: null,
        win: [],
    };
    cardClick = (ev, ary) => {
        if (this.state.open) {
            alert("이미 참여 하셨습니다.");
            return false;
        }
        const ran = Math.floor(Math.random() * 100 + 1);
        let result;
        if (ran >= 1 && ran <= 85) {
            result = 1;
        } else if (ran >= 86 && ran <= 95) {
            result = 2;
        } else {
            result = 3;
        }
        //alert(ev);
        const rest = ary
            .filter((e) => {
                if (e !== result) {
                    return e;
                }
            })
            .sort(() => {
                return Math.random() - Math.random();
            });
        console.log(rest);
        rest.splice(ev - 1, 0, result);
        console.log(rest);
        //alert(result);
        console.log(`인덱스 : ${ev}/ 결과 : ${ran}(${result}) / 배열 : ${ary}`);
        this.setState({
            open: true,
            rest: rest,
            target: ev,
            myCount: this.state.myCount - 1,
            win: this.state.win.concat(result),
        });
    };
    reSet = () => {
        if (this.state.myCount == 0) {
            alert("기회가 없으");
            return false;
        }
        this.setState({
            rest: [],
            open: false,
        });
    };
    render() {
        return (
            <div className="App">
                {this.state.myCount}

                <div className="inner">
                    <ul>
                        {!this.state.open
                            ? this.state.ary.map((e, i) => {
                                  return (
                                      <li
                                          onClick={() => {
                                              this.cardClick(e, this.state.ary);
                                          }}
                                          key={i}
                                      >
                                          <div className="inner">{e}</div>
                                      </li>
                                  );
                              })
                            : this.state.rest.map((e, i) => {
                                  if (i == this.state.target - 1) {
                                      return (
                                          <li
                                              onClick={() => {
                                                  this.cardClick(
                                                      e,
                                                      this.state.rest
                                                  );
                                              }}
                                              key={i}
                                          >
                                              <div
                                                  className={`inner open gift0${e} target`}
                                              >
                                                  {e}
                                              </div>
                                          </li>
                                      );
                                  } else {
                                      return (
                                          <li
                                              onClick={() => {
                                                  this.cardClick(
                                                      e,
                                                      this.state.rest
                                                  );
                                              }}
                                              key={i}
                                          >
                                              <div
                                                  className={`inner open gift0${e}`}
                                              >
                                                  {e}
                                              </div>
                                          </li>
                                      );
                                  }
                              })}
                    </ul>
                </div>

                {this.state.open && <Control onClick={this.reSet} />}
            </div>
        );
    }
}

export default App;
