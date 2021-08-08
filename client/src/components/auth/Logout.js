import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink, Button } from "reactstrap";
import PropTypes from "prop-types";

export class Logout extends Component {
  static PropTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Fragment>
          <Button color="danger" className="btn btn-sm">
            <NavLink onClick={this.props.logout} href="#">
              <span className="text-light">
                <b>Logout</b>
              </span>
            </NavLink>
          </Button>
        </Fragment>
      </div>
    );
  }
}

export default connect(null, { logout })(Logout);
