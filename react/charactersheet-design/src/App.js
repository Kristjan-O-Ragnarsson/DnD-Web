import React from 'react';
import './App.css';
import { Container, Form, Grid, Divider, Segment, Header, Table, Popup } from 'semantic-ui-react';

const formFields = {
  group1: [
    <Form.Input label="Character name" width={6} />,
    <Form.Input label="Player name" width={6} />
  ],
  group2: [
    <Form.Input label="Class" />,
    <Form.Input label="Race" />,
    <Form.Input label="Level" />
  ],
  group3: [
    <Form.Input label="HP" width={2} />,
    <Form.Input label="AC" width={2} />,
    <Form.Input label="Initiative" width={2} />,
    <Form.Input label="Speed" width={2}/>
  ],
  groupSample: [
    <Form.Input label="" />
  ]
}

class AbilityTable extends React.Component {
  constructor(props){
    super(props);
    this.abilities = ["str", "dex", "con", "int", "wis", "char"];
    this.headers = ["Ability", "Base", "Race", "Other", "Sum"];
    this.state = {
      abilities: [
        { name: "Strength", id: "str", base: 0, raceMod: 0, otherMod: 0},
        { name: "Dexterity", id: "dex", base: 0, raceMod: 0, otherMod: 0},
        { name: "Constition", id: "con", base: 0, raceMod: 0, otherMod: 0},
        { name: "Intelligence", id: "int", base: 0, raceMod: 0, otherMod: 0},
        { name: "Wisdom", id: "wis", base: 0, raceMod: 0, otherMod: 0},
        { name: "Charisma", id: "char", base: 0, raceMod: 0, otherMod: 0},
      ],
      elems: []
    };
  }

  updateAbilityScore(ability) {
    return ability.base + ability.raceMod + ability.otherMod;
  }

  render() {

    let headers = [];
    this.headers.forEach(header => {
      headers.push(<Table.HeaderCell>{header}</Table.HeaderCell>);
    });
    this.state.elems.push(
      <Table.Row>{headers}</Table.Row>
    );

    this.state.abilities.forEach((ability, i) => {
      this.state.elems.push(
        <Table.Row>
          <Table.Cell>{ability.name}</Table.Cell>
          <Table.Cell>
            <Form.Input 
              id={ability.id} 
              fluid 
              type="number" 
              value={ability.base}
            />
          </Table.Cell>
          <Table.Cell>{ability.raceMod}</Table.Cell>
          <Table.Cell>{ability.otherMod}</Table.Cell>
          <Table.Cell>{this.updateAbilityScore(ability)}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Table unstackable striped textAlign="center" >
        {this.state.elems}

      </Table>
    );
  }
}

function App() {
  return (
    <Container className="App">
      <Form>

        <Divider horizontal>
          <Header as="h3" />

        </Divider>

        <Form.Group>
          {formFields.group1}
        </Form.Group>

        <Segment>

          <Form.Group>
            {formFields.group2}
          </Form.Group>

          <Grid columns={2} stackable>
            <Grid.Column>
              <AbilityTable />
            </Grid.Column>
            <Grid.Column>
              <Form.Group>
                {formFields.group3}
              </Form.Group>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    
    </Container>
  );
}

export default App;
