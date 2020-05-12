import React, { Component } from "react";

class TOC extends Component {
    render() {
        var data = this.props.data;
        var li = [];
        data.map((e, i) => {
            li.push(
                <li key={i}>
                    <a
                        href={e.id}
                        onClick={(ev) => {
                            ev.preventDefault();
                            this.props.onSelect(e.id);
                        }}
                    >
                        {e.title}
                    </a>
                </li>
            );
        });
        return (
            <div className="contents">
                <ul>{li}</ul>
            </div>
        );
    }
}

class Content extends Component {
    render() {
        return (
            <article>
                <h2>{this.props.data.title}</h2>
                <p>{this.props.data.content}</p>
            </article>
        );
    }
}

class Control extends Component {
    render() {
        return (
            <div className="control">
                <a
                    href="/create"
                    onClick={(ev) => {
                        ev.preventDefault();
                        this.props.onClick("되냐");
                    }}
                >
                    create
                </a>
                <a
                    href="/update"
                    onClick={(ev) => {
                        ev.preventDefault();
                        this.props.onUpdate("update");
                    }}
                >
                    update
                </a>
                <input
                    type="button"
                    value="delete"
                    onClick={(ev) => {
                        ev.preventDefault();
                        this.props.onRemove("삭제");
                    }}
                />
            </div>
        );
    }
}
class Form extends Component {
    state = {
        title: "",
        content: "",
    };
    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    };
    render() {
        return (
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    this.props.onSubmit(this.state);
                    this.setState({
                        title: "",
                        content: "",
                    });
                }}
            >
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <br />
                <textarea
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                ></textarea>
                <br />
                <input type="submit" value="submit" />
            </form>
        );
    }
}

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            title: this.props.data.title,
            content: this.props.data.content,
        };
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    };
    render() {
        return (
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    this.props.onSubmit(
                        this.state.id,
                        this.state.title,
                        this.state.content
                    );
                }}
            >
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <br />
                <textarea
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                ></textarea>
                <br />
                <input type="submit" value="submit" />
            </form>
        );
    }
}
class App extends Component {
    last_content_id = 3;
    state = {
        selected_content_id: 1,
        mode: "read",
        contents: [
            { id: 1, title: "title1", content: "content1" },
            { id: 2, title: "title2", content: "content2" },
            { id: 3, title: "title3", content: "content3" },
        ],
    };
    getSelectedContent() {
        return this.state.contents.find((e) => {
            if (this.state.selected_content_id === e.id) {
                return e;
            }
        });
    }
    getMode() {
        if (this.state.mode === "read") {
            return <Content data={this.getSelectedContent()} />;
        } else if (this.state.mode === "create") {
            return (
                <Form
                    onSubmit={(sub) => {
                        this.last_content_id = this.last_content_id + 1;
                        sub.id = this.last_content_id;
                        var newContent = Object.assign([], this.state.contents);
                        newContent.push(sub);
                        this.setState({
                            contents: newContent,
                            selected_content_id: this.last_content_id,
                            mode: "read",
                        });
                    }}
                />
            );
        } else if (this.state.mode === "welcome") {
            return (
                <Content
                    data={{
                        title: "welcome",
                        content: "dkdkdk",
                    }}
                />
            );
        } else if (this.state.mode === "update") {
            return (
                <Update
                    data={this.state.contents.find((e) => {
                        if (e.id == this.state.selected_content_id) {
                            return e;
                        }
                    })}
                    onSubmit={function (_id, _title, _content) {
                        var _contents = Array.from(this.state.contents);
                        var i = 0;
                        while (i < _contents.length) {
                            if (_contents[i].id === _id) {
                                _contents[i] = {
                                    id: _id,
                                    title: _title,
                                    content: _content,
                                };
                                break;
                            }
                            i = i + 1;
                        }
                        this.setState({
                            contents: _contents,
                            mode: "read",
                        });
                    }.bind(this)}
                />
            );
        }
    }

    render() {
        return (
            <div className="app">
                <TOC
                    data={this.state.contents}
                    onSelect={(id) => {
                        this.setState({
                            selected_content_id: id,
                            mode: "read",
                        });
                    }}
                />

                {this.getMode()}

                <Control
                    onClick={(param) => {
                        this.setState({
                            mode: "create",
                        });
                    }}
                    onRemove={(target) => {
                        var newContent = this.state.contents.filter((e) => {
                            if (e.id !== this.state.selected_content_id) {
                                return e;
                            }
                        });
                        this.setState({
                            contents: newContent,
                            mode: "welcome",
                        });
                    }}
                    onUpdate={(param) => {
                        this.setState({
                            mode: "update",
                        });
                    }}
                />
            </div>
        );
    }
}

export default App;
