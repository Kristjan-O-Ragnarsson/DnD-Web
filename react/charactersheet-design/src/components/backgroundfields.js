import React from 'react';
import { Form, Header, Dropdown } from 'semantic-ui-react';

/**************************************************************
 *                                                            *
 *                Helpers and placeholders                    *
 *                                                            *
 **************************************************************/

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

const BackgroundFields = { Background, Personality };

export default BackgroundFields;