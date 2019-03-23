import React from 'react';
import ReactDOM from 'react-dom';

const name = 'Alyssa';
const element = <h1> Hello, {name}</h1>;

ReactDOM.render(element, document.getElementById('app'));