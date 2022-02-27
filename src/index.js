import React from "react";
import ReactDom from "react-dom";
import "./comment.css";

class Comments extends React.Component {
  state = {
    username: "",
    msg: "",
    editId: "",
    query: "",
    isSearchAreaShow: false,
    result: [],
    comments: [
      { id: 1, name: "jack", content: "fajs" },
      { id: 2, name: "rose", content: "fajskda" },
      { id: 3, name: "tom", content: "fzxc" },
    ],
  };

  // 文本框内容发生变化的事件处理程序
  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // 发表评论的处理流程
  sendMsg = () => {
    if (this.state.editId) {
      let newComments = this.state.comments;
      newComments.forEach((item) => {
        if (item.id === this.state.editId) {
          item.id = this.state.editId;
          item.name = this.state.username;
          item.content = this.state.msg;

          this.setState({
            comments: newComments,
            username: "",
            msg: "",
            editId: "",
          });
        }
      });
      console.log(this.state.comments);
    } else {
      if (this.state.msg.trim() === "" || this.state.username.trim() === "") {
        alert("请输入完整信息");
        return;
      } else {
        const newComments = [
          {
            id: this.state.comments.length + 1,
            name: this.state.username,
            content: this.state.msg,
          },
          ...this.state.comments,
        ];
        this.setState({
          comments: newComments,
          username: "",
          msg: "",
        });
      }

      console.log(this.state.comments);
    }
  };
  // 删除评论的处理方法
  deleteMsg = (id) => {
    console.log(id);
    let arr = [...this.state.comments];
    for (let i = 0; i < this.state.comments.length; i++) {
      if (this.state.comments[i].id === id) {
        arr.splice(
          arr.findIndex((item) => item.id === id),
          1
        );
      }
      break;
    }
    this.setState({
      comments: arr,
    });
  };
  // 编辑评论的处理流程
  editMsg = (id) => {
    let comments = this.state.comments;
    comments.forEach((item) => {
      if (item.id === id) {
        this.setState({
          editId: id,
          username: item.name,
          msg: item.content,
        });
      }
    });
  };
  // 搜索评论的处理流程
  //条件渲染搜索区域
  show = () => {
    if (this.state.isSearchAreaShow) {
      return (
        <div className="searchArea">
          <input
            placeholder="请输入用户名"
            onChange={this.handlerChange}
            name="query"
            className="query"
          ></input>
          <button onClick={this.search}>搜索</button>
          <ul>
            {this.state.result.map((item) => {
              return (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return null;
  };
  // 展示搜索区域
  showSearchArea = () => {
    this.setState({
      isSearchAreaShow: true,
    });
  };
  //搜索
  search = () => {
    let searchComments = [];
    this.state.comments.forEach((item) => {
      if (item.name === this.state.query) {
        searchComments.push(item);
      }
      this.setState({
        result: searchComments,
      });
    });
    console.log(searchComments);
  };
  // 条件渲染
  iseditIdShow = () => {
    if (this.state.editId === "") {
      return null;
    }
    return (
      <input value={this.state.editId} disabled className="editId"></input>
    );
  };
  isShowComments = () => {
    if (this.state.comments.length === 0) {
      return <div className="title">还没有评论哦,快来抢沙发</div>;
    }
    return (
      <ul>
        {this.state.comments.map((item) => {
          return (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <div className="citem">
                <p className="p">{item.content}</p>
                <div className="buttons">
                  <button
                    className="delete"
                    onClick={this.deleteMsg.bind(this, item.id)}
                  >
                    删除
                  </button>
                  <button
                    className="edit"
                    onClick={this.editMsg.bind(this, item.id)}
                  >
                    编辑
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  render() {
    return (
      // 发表评论区域
      <div className="container">
        <div className="sendArea">
          {this.iseditIdShow()}
          <input
            value={this.state.username}
            placeholder="请输入用户名"
            onChange={this.handlerChange}
            name="username"
            className="user"
          ></input>
          <textarea
            value={this.state.msg}
            placeholder="请发表评论"
            name="msg"
            cols="15"
            rows="15"
            onChange={this.handlerChange}
            className="content"
          ></textarea>
          <div className="btnArea">
            <button onClick={this.sendMsg}>发表评论</button>
            <button onClick={this.showSearchArea}>搜索评论</button>
          </div>
        </div>
        {/* 展示评论区 */}
        <div className="showArea">
          {/* <div className="title">还没有评论哦,快来抢沙发</div>
          <ul>
            {this.state.comments.map((item) => {
              return (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.content}</p>
                </li>
              );
            })}
          </ul> */}
          {this.isShowComments()}
        </div>
        {/* <div className="searchArea">
          <input
            placeholder="请输入用户名"
            onChange={this.handlerChange}
            name="query"
            className="query"
          ></input>
          <button onClick={this.search}>搜索</button>
        </div> */}
        {this.show()}
      </div>
    );
  }
}
ReactDom.render(<Comments></Comments>, document.getElementById("root"));
