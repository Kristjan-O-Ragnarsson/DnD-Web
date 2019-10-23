import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form } from 'semantic-ui-react';
 
function App() {
  return (
    <div className="App">
      <Form>
        <Form.Group>
          <Form.Input label="Character name" width={6} />
          <Form.Input label="Class" width={2} />
          <Form.Input label="Race" width={2} />
          <Form.Input label="Level" width={2} />
          <Form.Input label="Player name" width={4} />
        </Form.Group>
      </Form>
    
    </div>
  );
}

export default App;
