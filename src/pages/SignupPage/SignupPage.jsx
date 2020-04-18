import React from "react";
import SignupForm from "../../components/common/SignupForm";
import { Grid } from "semantic-ui-react"

const SignupPage = ({ handleSignupOrLogin, history }) => {
  return (
    <Grid>
      <Grid.Column mobile={1} tablet={2} computer={4} largeScreen={5}></Grid.Column>
      <Grid.Column mobile={14} tablet={12} computer={8} largeScreen={6}>
      <SignupForm handleSignupOrLogin={handleSignupOrLogin} history={history} />
      </Grid.Column>
      <Grid.Column mobile={1} tablet={2} computer={4} largeScreen={5}></Grid.Column>
    </Grid>
  );
};

export default SignupPage;
