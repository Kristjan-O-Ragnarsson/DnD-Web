import React from 'react';
import './App.css';
import { Form, Grid, Divider, Segment } from 'semantic-ui-react';

function BaseInfo() {
  return(
    <React.Fragment>
      <Form.Group>
        <Form.Input label="Character name" width={6} />
        <Form.Input label="Player name" width={6} />
      </Form.Group>
      <Form.Group>
        <Form.Input label="Class" />
        <Form.Input label="Race" />
        <Form.Input label="Level" />
      </Form.Group>
    </React.Fragment>
  );
}

function App() {
  return (
    <div className="App">
      <Form>

        < BaseInfo />

        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Form.Group inline>
                <Form.Input label="Strength" width={2} />
                <p> + (Mod from race) + (any other mod) = (Final sum [Modified])</p>
              </Form.Group>
              <Form.Field inline={true} width={6}>
                <label>Player name</label>
                <input type="text" />
                <label>label number dos</label>
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Input label="Class" />
              <Form.Input label="Race" />
              <Form.Input label="Level" />
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
      </Form>
    
    </div>
  );
}

export default App;
