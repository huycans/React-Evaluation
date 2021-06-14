import React from 'react';
import './app.css';
import './SCSS_styles.scss';

const App = () => {
  const sampleObj = {
    name: "Huy",
    age: 18
  };

  const { name, age } = sampleObj;
  return (
    <>
      <h1>Hello World from me</h1>
      <div className="name">My name is {name} and I'm {age} years old</div>
    </>
  );
};

export default App;