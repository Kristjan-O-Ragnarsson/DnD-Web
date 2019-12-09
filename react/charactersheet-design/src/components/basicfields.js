import React from 'react';
import { Form, Table, Dropdown } from 'semantic-ui-react';
import { useAsync } from "react-async";
import Helpers from "./helpers.js";


// Fetching D&D data from a Flask API
const loadRaces = async () => await fetch("https://api.open5e.com/races/")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json());
const loadClasses = async () => await fetch("https://api.open5e.com/classes/")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json());

/*********************************
 *   Handling leveling formula   *
 *********************************/
function LevelField(props) {
  // This function includes a simple formula that automatically 
  // increases the proficiency score based on the official rules
  function handleLevelChange(e) {
    let lvl = e.target.value;
    props.update("level", lvl);
    lvl < 2 ? props.update(2) : props.update("proficiency", Math.floor((lvl-1)/4)+2);
  }
  return(
    <Form.Input type="number" label="Level" value={props.level} width={3} onChange={handleLevelChange}/>
  );
}

/*********************************
 *   Level and class selection   *
 *********************************/
// SelectRace and SelectClass are almost identical. 
// We use a library called React-Async to fetch data and check for
// the conditions isLoading, error and data (data is the result of fetching)
function RaceField(props) {
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
    let race = data.results[data.results.findIndex(x => x.name === value)];
    props.update("race", race);
  }

  return (
    <React.Fragment>
      <label>Select a race</label>
      <Dropdown
        placeholder={_placeholder}
        selection
        scrolling
        options={_options}
        onChange={updateParent}
        />
        </React.Fragment>
  );
}

function ClassField(props) {
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
    let _class = data.results[data.results.findIndex(x => x.name === value)];
    props.update("class", _class);
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

function AbilityTable(props) {
  // We create a variable of names and abbreviations for easier use with loops
  const abilities = ["str", "dex", "con", "int", "wis", "char"];
  const abilityNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
  const headers = ["Ability", "Base", "Race", "Other", "Sum"];
  // Empty array we use to fill with jsx elements
  let elements = [];

  // We get the racial bonus from the parent and check if it should be only one 
  // ability or multiple abilities that get a bonus
  let racial;
  if (typeof(props.race.asi) !== "undefined") {
    if (props.race.asi.length === 1) {
      racial = {ability: props.race.asi[0].attributes[0], modifier: props.race.asi[0].value}
    } else {
      racial = props.race.asi.map(asi => {
        return {ability: asi.attributes[0], modifier: asi.value};
      })
    }
  }

  // Generate headers for our table
  let headerCells = headers.map(header => {
    return(<Table.HeaderCell key={"header-" + header}>{header}</Table.HeaderCell>);
  });
  
  // Function to loop through all abilities and create the jsx elements
  // and apply bonuses if applicable
  function fillElems() {
    // Using a map function to generate a new array
    elements = abilityNames.map((ability, i) => {

      // Here we need to check again if the parent componenet has given us a race
      // and check if the racial bonus matches the ability our loop is on
      let raceMod = 0;
      if (typeof(racial) !== "undefined") {
        if (Array.isArray(racial) && racial.findIndex(x => x.ability === ability) > -1) {
          raceMod = Number(racial[racial.findIndex(x => x.ability === ability)].modifier);
        } else if (racial.ability === ability) {
          raceMod = Number(racial.modifier);
        }
      }
      return (
        <Table.Row key={"row-" + abilities[i]}>
          <Table.Cell key={abilities[i] + "-name"} >{ability}</Table.Cell>
          <Table.Cell key={abilities[i] + "-base"} >
            <Form.Input fluid
              id={abilities[i]} 
              type="number" 
              size="mini" 
              value={props[abilities[i]]} 
              onChange={(e, {value}) => props.update(abilities[i], Number(value))}
              />
          </Table.Cell>
          <Table.Cell key={abilities[i] + "-race"} >{raceMod}</Table.Cell>
          <Table.Cell key={abilities[i] + "-other"} >{0}</Table.Cell>
          <Table.Cell key={abilities[i] + "-sum"} >
            { raceMod + props[abilities[i]] }
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  fillElems();

  return (
    <Table unstackable striped textAlign="center" compact>
      <Table.Header>
        <Table.Row>
          {headerCells}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {elements}
      </Table.Body>

    </Table>
  );
}

const BasicFields = { LevelField, RaceField, ClassField, AbilityTable };

export default BasicFields;