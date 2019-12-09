import React from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';
import BasicFields from "./basicfields";
import BackgroundFields from "./backgroundfields";


/**************************************************************
 *                                                            *
 *             Parent components and main form                *
 *              This is the main section. It is               *
 *              split up into smaller sections                *
 *                                                            *
 **************************************************************/
 /**********************
  *   Parent component *
  **********************/
function CompleteForm(props) {
  return( 
  <React.Fragment>
    <Form>
      <Segment>
      <Grid columns={2} stackable divided>
        {/* --- First Row - wrapping around the first row of columns. --- */}
        <Grid.Row stretched>

          <CharacterInfo />

        </Grid.Row>

        {/* --- Second Row - wrapping around the second row of columns. --- */}
        <Grid.Row>
        
          {/* Column 1 */}
          <Grid.Column>

            <BackgroundFields.Background />

          </Grid.Column>

          {/* Column 2 */}
          <Grid.Column>

            <BackgroundFields.Personality />

          </Grid.Column>

        </Grid.Row>

      </Grid>
      </Segment>
    </Form>
  </React.Fragment>

  );
}

 /**********************
  *   Parent component *
  **********************/
class CharacterInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      race: {},
      class: {},
      level: 0,
      proficiency: 2,
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      char: 0
    }
    this.updateStat = this.updateStat.bind(this);
  }

  // Update state with key value pairs
  updateStat(key, value) { this.setState({[key]: value}); console.log(this.state); }

  render() {
    return(
      <React.Fragment>
        {/* Column 1 */}
        <Grid.Column stretched>

          <Segment>
            <Form.Group>
              <Form.Input label="Character name" width={6} />
              <Form.Input label="Player name" width={6} />
              <BasicFields.LevelField update={this.updateStat} level={this.state.level} />
            </Form.Group>
            <Form.Group>
              <BasicFields.RaceField update={this.updateStat} />
              <BasicFields.ClassField update={this.updateStat} />
              <Form.Input label="Proficiency" width={2} value={this.state.proficiency} />
            </Form.Group>
            <Form.Group>
              <Form.Input label="HP" width={2} />
              <Form.Input label="AC" width={2} />
              <Form.Input label="Initiative" width={2} />
              <Form.Input label="Speed" width={2} />
            </Form.Group>
          </Segment>

        </Grid.Column>
  
      {/* Column 2 */}
        <Grid.Column>

          <BasicFields.AbilityTable 
            update={this.updateStat}
            race={this.state.race} 
            str={this.state.str} 
            dex={this.state.dex} 
            con={this.state.con} 
            int={this.state.int} 
            wis={this.state.wis} 
            char={this.state.char} 
          />

        </Grid.Column>
      </React.Fragment>
    );
  }
}

// Gather all of our components into a variable
const CharacterForm = { CompleteForm };

// Export the form to be plugged into the final website
export default CharacterForm;