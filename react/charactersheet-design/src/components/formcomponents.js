import React from 'react';
import { Form, Header, Table, Dropdown } from 'semantic-ui-react';
import { useAsync } from "react-async";
import Helpers from "./helpers.js";

/**************************************************************
 *                                                            *
 *                Helpers and placeholders                    *
 *                                                            *
 **************************************************************/


// Fetching D&D data from a Flask API
const loadRaces = async () => await fetch("https://api.open5e.com/races/")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json());
const loadClasses = async () => await fetch("https://api.open5e.com/classes/")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json());

// Some placeholder values - would be removed in later versions
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

/**************************************************************
 *                                                            *
 *             Parent component and form fiels                *
 *              This is the main section. It is               *
 *              split up into smaller sections                *
 *                                                            *
 **************************************************************/

 /**********************
  *   Parent component *
  **********************/
class CharacterInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      race: "",
      class: "",
      level: 0,
      proficiency: 0,
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
        <Form.Group>
          <Form.Input label="Character name" width={6} />
          <Form.Input label="Player name" width={6} />
          <ChangeLevel update={this.updateStat}/>
        </Form.Group>
        <Form.Group>
          <SelectRace update={this.updateStat} />
          <SelectClass update={this.updateStat} />
          <Form.Input label="Proficiency" width={2} value={this.state.proficiency} />
        </Form.Group>
        <Form.Group>
          <Form.Input label="HP" width={2} />
          <Form.Input label="AC" width={2} />
          <Form.Input label="Initiative" width={2} />
          <Form.Input label="Speed" width={2} />
        </Form.Group>
      </React.Fragment>
    );
  }
}

/*********************************
*   Handling leveling formula    *
**********************************/
function ChangeLevel(props) {
  // This function includes a simple formula that automatically 
  // increases the proficiency score based on the official rules
  function handleLevelChange(e) {
    let lvl = e.target.value;
    props.update("level", lvl);
    props.update("proficiency", Math.floor((lvl-1)/4)+2);
  }
  return(
    <Form.Input type="number" label="Level" width={3} onChange={handleLevelChange}/>
  );
}

/*********************************
 *   Level and class selection   *
 *********************************/
// SelectRace and SelectClass are almost identical. 
// We use a library called React-Async to fetch data and check for
// the conditions isLoading, error and data (data is the result of fetching)
function SelectRace(props) {
  let _placeholder = "";
  let _options = [];
  const { data, error, isLoading } = useAsync({ promiseFn: loadRaces });
  if (isLoading) [_placeholder, _options] = Helpers.fetchLoading("race"); 
  if (error) [_placeholder, _options] = Helpers.fetchError(error.message, "race");
  if (data) {
    _placeholder = data.results[0].name;
    _options = data.results.map(race => {
      return {key:`race_${race.name}`, text:race.name, value:race.name};
    });
  }

  function updateParent(e, { value }) {
    props.update("race", value);
  }

  return (
    <Form.Field>
      <label>Select a race</label>
      <Dropdown
        placeholder={_placeholder}
        selection
        scrolling
        options={_options}
        onChange={updateParent}
        />
      </Form.Field>
  );
}

function SelectClass(props) {
  let _placeholder = "";
  let _options = [];
  const { data, error, isLoading } = useAsync({ promiseFn: loadClasses });
  if (isLoading) [_placeholder, _options] = Helpers.fetchLoading("class"); 
  if (error) [_placeholder, _options] = Helpers.fetchError(error.message, "class");
  if (data) {
    _placeholder = data.results[0].name;
    _options = data.results.map(_class => {
      return {key:`class_${_class.name}`, text:_class.name, value:_class.name};
    });
  }

  function updateParent(e, { value }) {
    props.update("class", value);
  }

  return (
    <Form.Field>
      <label>Select a class</label>
      <Dropdown
        placeholder={_placeholder}
        selection
        scrolling
        options={_options}
        onChange={updateParent}
        />
      </Form.Field>
  );
}

 /*********************************
  *   This is the ability table   *
  *   It is str, dex, con, etc.   *
  *********************************/
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

  // This function does not work and needs to be worked on. I couldn't get to it in time
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

/*********************************
*   This section is for          *
*   background selection         *
**********************************/
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

/**************************************
*   Section for personality options   *
***************************************/
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

// Gather all of our components into a variable
// Ideally this would just be one class with a reference to each component
const FormInfo = { CharacterInfo, AbilityTable, Background, Personality };

// Export the form to be plugged into the final website
export default FormInfo;