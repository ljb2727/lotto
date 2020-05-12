import React, { Component } from "react";

import "./style.css";

class Card extends Component {
    state = {
        ary: [1, 2, 3, 4, 5, 6],
    };

    render() {
        return (
            <div>
                {this.props.rest.length == 0 ? (
                    <div className="inner">
                        <ul>
                            {this.state.ary.map((e, i) => {
                                return (
                                    <li
                                        onClick={() => {
                                            this.props.cardClick(
                                                e,
                                                this.state.ary
                                            );
                                        }}
                                        key={i}
                                    >
                                        <div className="inner">{e}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div className="inner">
                        <ul>
                            {this.props.rest.map((e, i) => {
                                return (
                                    <li
                                        onClick={() => {
                                            this.props.cardClick(
                                                e,
                                                this.state.ary
                                            );
                                        }}
                                        key={i}
                                    >
                                        <div className="inner open">{e}</div>
                                    </li>
                                );
                            })}
                        </ul>
                        {this.props.target}
                    </div>
                )}
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
    };
    cardClick = (ev, ary) => {
        const ran = Math.floor(Math.random() * 100 + 1);
        let result;
        if (ran >= 1 && ran <= 85) {
            result = 1;
        } else if (ran >= 86 && ran <= 95) {
            result = 2;
        } else {
            result = 3;
        }
        const rest = ary
            .filter((e) => {
                if (e !== ev) {
                    return e;
                }
            })
            .sort(() => {
                return Math.random() - Math.random();
            });
        rest.splice(ev - 1, 0, ev);
        console.log(rest);
        //alert(result);
        console.log(`인덱스 : ${ev}/ 결과 : ${ran}(${result}) / 배열 : ${ary}`);
        this.setState({
            open: true,
            rest: rest,
            target: ev,
        });
    };
    render() {
        return (
            <div className="App">
                <p style={{ textAlign: "center" }}>
                    남은 기회 : {this.state.myCount}
                </p>
                <Card
                    cardClick={this.cardClick}
                    rest={this.state.rest}
                    target={this.state.target}
                />
            </div>
        );
    }
}

export default App;
