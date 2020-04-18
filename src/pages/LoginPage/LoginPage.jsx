import React from "react";
import LoginForm from "../../components/common/LoginForm";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LoginPage = ({ handleSignupOrLogin, history }) => {
  return (
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 600 }} textAlign="left">
        <LoginForm
          handleSignupOrLogin={handleSignupOrLogin}
          history={history}
        />
        <Header size="medium" textAlign="center">
          New around here? <Link to="/signup">Sign up now.</Link>
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
