import React from 'react';
import "./Header.css";
import 'semantic-ui-css/semantic.min.css'
import { Form, Checkbox } from 'semantic-ui-react'
import Artical from './Artical';
import Question from './Question';

function Postpage() {
  const [value, setValue] = React.useState('Question');

  return (
    <div className="App">
      <div>
        <div className="title">
          <h2 style={{ float: "left" }}>New Post</h2>
        </div>
        <div className="select">
          <div><h3>Select Post Type :</h3></div>
          <Form className="selection">
            <Form.Field>
              <Checkbox
                radio
                label='Question'
                name='checkboxRadioGroup'
                value='Question'
                checked={value === 'Question'}
                onChange={(e, data) => setValue(data.value)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                className="s2"
                radio
                label='Artical'
                name='checkboxRadioGroup'
                value='Artical'
                checked={value === 'Artical'}
                onChange={(e, data) => setValue(data.value)}
              />
            </Form.Field>
          </Form>
        </div>
      </div>
      <h3 className='ask' style={{ width: '100%', height: '24px', backgroundColor: "rgb(206, 203, 200)", textAlign: "left" }}>What do you want to ask or share </h3>

      { value === "Question" ? <Question /> : <Artical /> }
    </div>
  );
}

export default Postpage;
