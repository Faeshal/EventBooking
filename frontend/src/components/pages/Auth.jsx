import React, { Component } from "react";
import AuthContext from "../auth-context";

class Auth extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <h2 className="mt-4">FORM LOGIN</h2>
        <hr />
        <div className="row mt-4">
          <div className="col-sm-5 mx-auto mb-3">
            <form onSubmit={this.submitHandler}>
              <div className="form-group mt-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="faeshal@mail.com"
                  id="email"
                  ref={this.emailEl}
                  value="faeshal@mail.com"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  id="faeshal"
                  ref={this.passwordEl}
                  value="faeshal"
                />
              </div>
              <br />
              <div className="form-group text-center mx-auto">
                <button
                  type="submit"
                  className="btn btn-lg btn-outline-success mt-2 mr-4"
                >
                  Submit
                </button>
                <button
                  className="btn btn-lg btn-outline-primary mt-2 ml-4"
                  onClick={this.switchModeHandler}
                  type="button"
                >
                  Switch To {this.state.isLogin ? "Signup" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
