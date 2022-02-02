import "./App.css";
import React, { Fragment, Component } from "react";
import NavBar from "./component/layout/Navbar";
import User from "./component/user/Users";
import axios from "axios";
import Search from "./component/user/Search";
import Alert from "./component/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./component/pages/About";
import SearchComp from "./component/user/SearchComp";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  }

  searchUsers = async (txt) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${txt}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <h1>
            <NavBar title="GitHub Finder" icon="fab fa-github" />
            <div className="container">
              <Alert alert={this.state.alert} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Fragment>
                      <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users && users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                      />
                      <User users={users} loading={loading} />
                    </Fragment>
                  )}
                />
              </Switch>
            </div>
          </h1>
        </div>
      </Router>
    );
  }
}
export default App;
