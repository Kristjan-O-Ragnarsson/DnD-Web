import React from 'react';
import { Form, Header, Table, Dropdown } from 'semantic-ui-react';

const skills = {
  Athletics: {value: 0, other: "placeholder?"},
  Acrobatics: {value: 0, other: "placeholder?"},
  Arcana: {value: 0, other: "placeholder?"}
};
const toolProfs = {
  Thieves: {value: 0, other: "placeholder?"},
  Instrument: {value: 0, other: "placeholder?"},
  Jewelers: {value: 0, other: "placeholder?"}
};
const languages = {
  Common: {value: 0, other: "placeholder?"},
  Dwarven: {value: 0, other: "placeholder?"},
  Abyssal: {value: 0, other: "placeholder?"}
};
const features = {
  placeholderFeature1: {value: 0, other: "placeholder?"},
  placeholderFeature2: {value: 0, other: "placeholder?"},
  placeholderFeature3: {value: 0, other: "placeholder?"}
}

function setSelectOptions(obj) {
  let tempObject = [];
  for (let _key in obj) {
    tempObject.push(
      {key: _key, text: _key, value: _key}
    );
  };
  return tempObject;
}

const skillSelect = setSelectOptions(skills);
const toolProfSelect = setSelectOptions(toolProfs);
const languageSelect = setSelectOptions(languages);
const featureSelect = setSelectOptions(features);
function BasicInfo(props) {
  return (
    <React.Fragment>
      <Form.Group>
        <Form.Input label="Character name" width={6} />,
          <Form.Input label="Player name" width={6} />
      </Form.Group>
      <Form.Group>
        <Form.Input label="Race" />,
        <Form.Input label="Proficiency" width={2} />
      </Form.Group>
      <Form.Group>
        <Form.Input label="HP" width={2} />,
        <Form.Input label="AC" width={2} />,
        <Form.Input label="Initiative" width={2} />,
        <Form.Input label="Speed" width={2} />
      </Form.Group>
    </React.Fragment>
  )
}

class AbilityTable extends React.Component {
  constructor(props) {
    super(props);
    this.abilities = ["str", "dex", "con", "int", "wis", "char"];
    this.headers = ["Ability", "Base", "Race", "Other", "Sum"];
    this.state = {
      abilities: [
        { name: "Strength", id: "str", base: 0, raceMod: 0, otherMod: 0 },
        { name: "Dexterity", id: "dex", base: 0, raceMod: 0, otherMod: 0 },
        { name: "Constition", id: "con", base: 0, raceMod: 0, otherMod: 0 },
        { name: "Intelligence", id: "int", base: 0, raceMod: 0, otherMod: 0 },
        { name: "Wisdom", id: "wis", base: 0, raceMod: 0, otherMod: 0 },
        { name: "Charisma", id: "char", base: 0, raceMod: 0, otherMod: 0 },
      ],
      elems: []
    };
  }

  updateAbilityScore(ability) {
    return ability.base + ability.raceMod + ability.otherMod;
  }

  fillStateElems() {
    this.state.abilities.forEach((ability, i) => {
      let key = ability.id;
      this.state.elems.push(
        <Table.Row key={"row-" + key}>
          <Table.Cell key={key + "-name"} >{ability.name}</Table.Cell>
          <Table.Cell key={key + "-base"} >
            <Form.Input id={ability.id} fluid type="number" size="mini" value={ability.base} />
          </Table.Cell>
          <Table.Cell key={key + "-race"} >{ability.raceMod}</Table.Cell>
          <Table.Cell key={key + "-other"} >{ability.otherMod}</Table.Cell>
          <Table.Cell key={key + "-sum"} >{this.updateAbilityScore(ability)}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {

    let headerCells = this.headers.map((header, i) => <Table.HeaderCell key={i}>{header}</Table.HeaderCell>);

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


function Background(props) {

  return (
    <React.Fragment>
    <Header as="h4" dividing>Background</Header>,
    <Form.Group inline>
      <Form.Input label="Name:" />
      <Form.Button label="&nbsp;">Create new</Form.Button>
    </Form.Group>,
    <Form.Group inline>
      <Dropdown 
        placeholder="Select two skills" 
        fluid 
        multiple 
        search
        selection 
        options={skillSelect} 
      />
    </Form.Group>,
    <Form.Group inline>
      <Form.Radio label="Tool" value="tool1"/>
      <Form.Radio label="Language" value="lang1"/>
      - Divider -
      <Form.Radio label="Tool" value="tool2"/>
      <Form.Radio label="Language" value="lang2"/>
    </Form.Group>,
    <Form.Group>
      <Dropdown 
        placeholder="Select a proficiency" 
        fluid
        search
        selection 
        options={toolProfSelect} 
      />
      <Dropdown
        placeholder="Select a language" 
        fluid
        search
        selection 
        options={languageSelect} 
      />
    </Form.Group>
    <Form.Group>
      <Dropdown
        placeholder="Select a feature" 
        fluid
        search
        selection 
        options={featureSelect} 
      />
    </Form.Group>
    </React.Fragment>
  );
}

function Personality(props) {
  return (
    <React.Fragment>
      <Form.TextArea key={"persTraits"} rows={2} label="Personality traits" />
      <Form.TextArea key={"ideals"} rows={1} label="Ideals" />
      <Form.TextArea key={"bonds"} rows={1} label="Bonds" />
      <Form.TextArea key={"flaws"} rows={1} label="Flaws" />
    </React.Fragment>
  )
}

const FormInfo = { BasicInfo, AbilityTable, Background, Personality };

export default FormInfo;