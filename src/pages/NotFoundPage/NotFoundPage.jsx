import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 1024 }} textAlign="left">
        <Header size="huge">
          It would appear that the page you're looking for doesn't exist!
        </Header>
        <Header size="medium">
          <Link to="/">Go back home.</Link>
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default NotFoundPage;
