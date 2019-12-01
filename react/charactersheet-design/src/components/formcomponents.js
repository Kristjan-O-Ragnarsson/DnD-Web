import React, { useState } from 'react';
import { Form, Header, Table, Dropdown } from 'semantic-ui-react';
import { useAsync } from "react-async";

const loadRaces = async () => await fetch("https://api.open5e.com/races/")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json());
const loadClasses = async () => await fetch("https://api.open5e.com/classes/")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json());


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

// fetchLoading and fetchError are just simple methods to get 
// variables which are needed for many operations
function fetchLoading(fetchName) {
  // Should return as: _placeholder = "loading" and _options=[{key: , text:}]
  return [
    "loading",
    [{key:`${fetchName}_loading`, text:"loading"}]
  ];
}
function fetchError(err, fetchName) {
  return [
    `Something went wrong: ${err.message}`,
  [{key:`${fetchName}_error`, text:"error"}]
];
}

function SelectRace(props) {
  let _placeholder = "";
  let _options = [];
  const { data, error, isLoading } = useAsync({ promiseFn: loadRaces });
  if (isLoading) [_placeholder, _options] = fetchLoading("race"); 
  if (error) [_placeholder, _options] = fetchError(error.message, "race");
  if (data) {
    _placeholder = data.results[0].name;
    _options = data.results.map(race => {
      return {key:`race_${race.name}`, text:race.name, value:race.name};
    });
  }

  return (
    <Form.Field>
      <label>Select a race</label>
      <Dropdown
        placeholder={_placeholder}
        selection
        scrolling
        options={_options}
        />
      </Form.Field>
  );
}

function SelectClass(props) {
  let _placeholder = "";
  let _options = [];
  const { data, error, isLoading } = useAsync({ promiseFn: loadClasses });
  if (isLoading) [_placeholder, _options] = fetchLoading("class"); 
  if (error) [_placeholder, _options] = fetchError(error.message, "class");
  if (data) {
    _placeholder = data.results[0].name;
    _options = data.results.map(_class => {
      return {key:`class_${_class.name}`, text:_class.name, value:_class.name};
    });
  }

  return (
    <Form.Field>
      <label>Select a class</label>
      <Dropdown
        placeholder={_placeholder}
        selection
        scrolling
        options={_options}
        />
      </Form.Field>
  );
}


const skillSelect = setSelectOptions(skills);
const toolProfSelect = setSelectOptions(toolProfs);
const languageSelect = setSelectOptions(languages);
const featureSelect = setSelectOptions(features);
function BasicInfo(props) {
  const [prof, setProf] = useState(2);
  function handleLevelChange(e) {
    let lvl = e.target.value;
    // Formula to calculate the proficiency bonus
    setProf(Math.floor((lvl-1)/4) + 2);
  }

  return (
    <React.Fragment>
      <Form.Group>
        <Form.Input label="Character name" width={6} />
        <Form.Input label="Player name" width={6} />
        <Form.Input id="inpLvl" label="Level" width={2} onChange={handleLevelChange}/>
      </Form.Group>
      <Form.Group>
        <SelectRace />
        <SelectClass />
        <Form.Input label="Proficiency" width={2} value={prof} />
      </Form.Group>
      <Form.Group>
        <Form.Input label="HP" width={2} />
        <Form.Input label="AC" width={2} />
        <Form.Input label="Initiative" width={2} />
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