import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  NavLink,
  Alert,
} from "reactstrap";
import { Model } from "mongoose";

class LoginModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
  };

  static PropTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error.id !== prevProps.error) {
      //check login errors
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    //if authentication passes
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //clear errors
    this.state.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = { email, password };

    //try to login

    this.props.login(user);
  };

  render() {
    return (
      <div className="container">
        <Button color="success" className="btn btn-sm">
          <NavLink onClick={this.toggle} href="#">
            <span>
              <b>Login</b>
            </span>
          </NavLink>
        </Button>
        <Model isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Login </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="mb-3"
                  placeholder="Email"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-3"
                  placeholder="Password"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }}>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Model>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
