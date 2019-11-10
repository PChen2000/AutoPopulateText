import React from 'react';
import logo from './logo.svg';
import './App.css';
import AutoCompleteText from './AutoCompleteText';
import { employees } from './data/employees.js';
import { visitors } from './data/visitors.js';
import style from './pages/Example.module.css';

const empIDMap = getEmpIDMap(employees);
const visitorIDMap = getVisitorIDMap(visitors);

function getEmpIDMap(dataArray)
{
    if(!dataArray || dataArray.length === 0)
        return new Map();

    let map = new Map();

    for(var i = 0; i < dataArray.length; i++)
        map.set(dataArray[i].last + ', ' + dataArray[i].first, dataArray[i]);

    return map;
}

function getVisitorIDMap(dataArray)
{
    if(!dataArray || dataArray.length === 0)
        return new Map();

    let map = new Map();

    for(var i = 0; i < dataArray.length; i++)
        map.set(dataArray[i].last + ', ' + dataArray[i].first, dataArray[i]);

    return map;
}

function App() {
  return (
    <div className="App-Component">
      <label>Type in Visitor Name:</label>
      <AutoCompleteText tabIndex={0} items={visitors} idMap={visitorIDMap} isEditable={true} />
      <br /><br />
      <label>Type in Staff Member Name:</label>
      <AutoCompleteText tabIndex={1} items={employees} idMap={empIDMap} />
  </div>
  );
}

export default App;
