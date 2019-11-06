import React from 'react';
import './App.css';
import { Container, Form, Grid, Segment } from 'semantic-ui-react';
import FormInfo from "./components/formcomponents.js";

function App() {
  return (
    <Container className="App">
      <Form>

        {/**/}
        <Segment>
          {/* Basic information */}
          {/* First Row - wrapping around the first row of columns. */}
          <Grid columns={2} stackable divided>
            {/* Grid Column 1 */}
            <Grid.Row stretched>
              <Grid.Column stretched>

                <Segment>
                  <FormInfo.BasicInfo />
                </Segment>

              </Grid.Column>

              {/* Grid Column 2 */}
              <Grid.Column>

                <FormInfo.AbilityTable />
              </Grid.Column>
            </Grid.Row>

            {/* -------------------------------------------------------------- */}

            {/* Personality and background */}
            {/* Second Row - wrapping around the sceond row of columns */}
            {/* Grid Column 1 */}
            <Grid.Row>
              <Grid.Column>
                <FormInfo.Background />
              </Grid.Column>

              {/* Grid Column 2 */}
              <Grid.Column>
                <FormInfo.Personality />
              </Grid.Column>
            </Grid.Row>

            {/* -------------------------------------------------------------- */}

            {/* Personality and description */}
            {/* Third Row - wrapping around the third row of columns */}
            {/* Grid Column 1 */}
            <Grid.Row>
              <Grid.Column>

              </Grid.Column>

              {/* Grid Column 2 */}
              <Grid.Column>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

      </Form>

    </Container>
  );
}

export default App;
