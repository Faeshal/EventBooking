import React, { Component } from "react";

class Auth extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="mt-4">FORM LOGIN</h2>
        <hr />
        <div className="row mt-4">
          <div className="col-sm-5 mx-auto mb-3">
            <form>
              <div className="form-group mt-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  id="email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  id="password"
                />
              </div>
              <br />
              <div className="form-group text-center mx-auto">
                <button className="btn btn-lg btn-outline-primary mt-2 mr-2">
                  <a
                    href="/signup"
                    style={{ textDecoration: "none", color: "currentColor" }}
                  >
                    SIGNUP
                  </a>
                </button>
                <button
                  type="submit"
                  className="btn btn-lg btn-outline-success mt-2 ml-2"
                >
                  LOGIN
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
