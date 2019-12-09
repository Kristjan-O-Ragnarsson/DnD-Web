import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import CharacterForm from "./components/formcomponents.js";

function App() {
  return (
    <Container className="App">
        <CharacterForm.CompleteForm />
    </Container>
  );
}

export default App;
