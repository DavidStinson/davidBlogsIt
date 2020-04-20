import React from "react";
import SignupForm from "../../components/common/SignupForm";
import { Grid } from "semantic-ui-react";

const SignupPage = ({ handleSignupOrLogin, history }) => {
  return (
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 600 }} textAlign="left">
        <SignupForm
          handleSignupOrLogin={handleSignupOrLogin}
          history={history}
        />
      </Grid.Column>
    </Grid>
  );
};

export default SignupPage;
