import React from 'react';
import EditTopicsForm from "../../components/EditTopicsForm/EditTopicsForm"
import { Grid } from "semantic-ui-react";


const TopicsPage = props => {
  return ( 
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 600}} textAlign="left">
        <EditTopicsForm {...props}
        />
      </Grid.Column>
    </Grid>
  );
}
 
export default TopicsPage;