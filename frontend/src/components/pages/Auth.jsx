import React, { Component } from "react";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().lenght === 0 || password.trim().lenght === 0) {
      return;
    }

    // QUERY GRAPQL
    const requestBody = {
      query: `
        mutation{
          createUser(userInput:{email:"${email}",password:"${password}"}){
            _id
            email
          }
        }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
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
                  placeholder="Email"
                  id="email"
                  ref={this.emailEl}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  id="password"
                  ref={this.passwordEl}
                />
              </div>
              <br />
              <div className="form-group text-center mx-auto">
                <button
                  type="submit"
                  className="btn btn-lg btn-outline-success mt-2 mr-4"
                >
                  Signup
                </button>
                <button className="btn btn-lg btn-outline-primary mt-2 ml-4">
                  <a
                    href="/signup"
                    style={{ textDecoration: "none", color: "currentColor" }}
                  >
                    Login
                  </a>
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
