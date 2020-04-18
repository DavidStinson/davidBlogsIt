import React from "react";
import LoginForm from "../../components/common/LoginForm";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LoginPage = ({ handleSignupOrLogin, history }) => {
  return (
    <>
      <Grid>
        <Grid.Column
          mobile={1}
          tablet={2}
          computer={4}
          largeScreen={5}
        ></Grid.Column>
        <Grid.Column mobile={14} tablet={12} computer={8} largeScreen={6}>
          <LoginForm
            handleSignupOrLogin={handleSignupOrLogin}
            history={history}
          />
        </Grid.Column>
        <Grid.Column
          mobile={1}
          tablet={2}
          computer={4}
          largeScreen={5}
        ></Grid.Column>
      </Grid>
      <Header size="medium" textAlign="center">
        New around here? <Link to="/signup">Sign up now.</Link>
      </Header>
    </>
  );
};

export default LoginPage;
