import React from 'react';
import './App.css';
import { Container, Form, Grid, Divider, Segment, Header, Table, Popup } from 'semantic-ui-react';

const formFields = {
  group1: [
    <Form.Input key={"cName"} label="Character name" width={6} />,
    <Form.Input key={"pName"} label="Player name" width={6} />
  ],
  group2: [
    <Form.Input key={"class"} label="Class" />,
    <Form.Input key={"level"} label="Level" width={2}/>,
  ],
  group3: [
    <Form.Input key={"race"} label="Race" />,
    <Form.Input key={"prof"} label="Proficiency" width={2}/>
  ],
  group4: [
    <Form.Input key={"hp"} label="HP" width={2} />,
    <Form.Input key={"ac"} label="AC" width={2} />,
    <Form.Input key={"init"} label="Initiative" width={2} />,
    <Form.Input key={"speed"} label="Speed" width={2}/>
  ],
  group5: [

  ],
  group6: [
    <Form.Input key={"persTraits"} label="Personality traits" />,
    <Form.Input key={"ideals"} label="Ideals" />,
    <Form.Input key={"bonds"} label="Bonds" />,
    <Form.Input key={"flaws"} label="Flaws" />
  ],
  groupSample: [
    <Form.Input key={"empty"} label="" />
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

  fillStateElems(){
    this.state.abilities.forEach((ability, i) => {
      let key = ability.id;
      this.state.elems.push(
        <Table.Row key={"row-"+key}>
          <Table.Cell key={key+"-name"} >{ability.name}</Table.Cell>
          <Table.Cell key={key+"-base"} >
            <Form.Input id={ability.id} fluid type="number" size="mini" value={ability.base} />
          </Table.Cell>
          <Table.Cell key={key+"-race"} >{ability.raceMod}</Table.Cell>
          <Table.Cell key={key+"-other"} >{ability.otherMod}</Table.Cell>
          <Table.Cell key={key+"-sum"} >{this.updateAbilityScore(ability)}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {

    let headerCells = [];
    this.headers.forEach((header, i) => {
      headerCells.push(<Table.HeaderCell key={i}>{header}</Table.HeaderCell>);
    });

    this.fillStateElems();

    return (
      <Table unstackable striped textAlign="center" compact>
        <Table.Header>
          <Table.Row>
            {headerCells}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.elems}
        </Table.Body>

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

          <Grid columns={2} stackable>

            <Grid.Column>

              <Form.Group>
                {formFields.group2}
              </Form.Group>
              <Form.Group>
                {formFields.group3}
              </Form.Group>
              <Form.Group>
                {formFields.group4}
              </Form.Group>
              <Form.Group>
                {formFields.group5}
              </Form.Group>
              <Form.Group>
                {formFields.group6}
              </Form.Group>

            </Grid.Column>

            <Grid.Column>

              <AbilityTable />
              
            </Grid.Column>
          </Grid>

        </Segment>

      </Form>
    
    </Container>
  );
}

export default App;
