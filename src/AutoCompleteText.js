import React from 'react';
import PropTypes from 'prop-types';
import './AutoCompleteText.css';
import PersonInfo from './PersonInfo';
import PersonEntry from './PersonEntry';

function compareEmployee(emp1, emp2)
{
    if(!emp1 || !emp2) return NaN;
    let num = 0;
    const last1 = emp1.last;
    const last2 = emp2.last;
    const first1 = emp1.first;
    const first2 = emp2.first;

    if(!last1 || last1.trim().length === 0)
    {
        if(!last2 || last2.trim().length === 0)
            num = 0;
        else
            num = -1;
    }
    else
    {
        if(!last2 || last2.trim().length === 0)
            num = 1;
        else
        {
            if(last1.trim() === last2.trim())
                num = 0;
            else
                num = (last1.trim() < last2.trim() ? -1 : 1);
        }
    }
    if(num !== 0)  return num;
    if(!first1 || first1.trim().length === 0)
    {
        if(!first2 || first2.trim().length === 0)
            num = 0;
        else
            num = -1;
    }
    else
    {
        if(!first2 || first2.trim().length === 0)
            num = 1;
        else
        {
            if(first1.trim() === first2.trim())
                num = 0;
            else
                num = (first1.trim() < first2.trim() ? -1 : 1);
        }
    }
    return num;
}

function sortNames(s, inArray)
{
    if(!inArray || inArray.length === 0)
		return [];
	if(inArray.length === 1
	|| s.trim() === '')
		return inArray;
	const filtered
		= inArray.filter(v =>
		v.trim() !== ''
        && v.toLowerCase()
		.indexOf(s.toLowerCase()) >= 0);
	if(filtered.length <= 1)  return filtered;
	
	let loc = -1;
	let text = '';
	let isBySpace = false;
	const array1
		= filtered.filter(v =>
        v.toLowerCase() === s.toLowerCase());
	const array2
		= filtered.filter(v =>
        v.toLowerCase()
		.indexOf(s.toLowerCase()) === 0
		&& v.toLowerCase() !== s.toLowerCase()).sort();
	const array3
		= filtered.filter(v =>
        v.toLowerCase()
		.indexOf(s.toLowerCase()) > 0);
	let array4 = [];
	let array5 = [];
	let results = [];
	for(var i = 0; i < array3.length; i++)
	{
		loc = -1;
		isBySpace = false;
		text = array3[i];
		loc
			= text.toLowerCase()
			.indexOf(s.toLowerCase());
		isBySpace
			= (text.substr(loc - 1, 1) === ' ');
		if(isBySpace)
			array4.push(text);
		else
			array5.push(text);
	}
	if(array1.length > 0)
		results = array1;
	if(array2.length > 0)
		results = results.concat(array2);
	if(array4.length > 0)
	{
		if(array4.length > 1)
			array4.sort();
		results = results.concat(array4);
	}
	if(array5.length > 0)
	{
		if(array5.length > 1)
			array5.sort();
		results = results.concat(array5);
	}
	
	return results;
}

function getDisplays(dataArray)
{
  let array = [];

  for(var i = 0; i < dataArray.length; i++)
    array.push(dataArray[i].last + ', ' + dataArray[i].first);

  return array;
}


export default class AutoCompleteText extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
            personData: null,
            isPersonLoading: false,
            isEditable: false,
            isAddNew: false,
        };
    }

    componentDidMount()
    {
        if(this.input)  this.input.focus();
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        //const value = e.target.value;
        var value = e.target.value;
        let suggestions = [];
        const displays = getDisplays(items);
        if(value.length > 0)
        {
            suggestions = displays
                .filter(v =>
                    v.toLowerCase().indexOf(value.toLowerCase()) >= 0
                );
            if(suggestions.length > 1)
                suggestions = sortNames(value, suggestions);
            if(suggestions.length > 10)
                suggestions.length = 10;
        }
        this.setState(() => ({
            suggestions,
            text: value,
            personData: null,
            isPersonLoading: false,
            isEditable: false,
        }));
    }

    clickNewVisitor = (e) => {
        this.setState(() => ({
            isAddNew: true,
        }));
    }

    clickCancelAdd = (e) => {
        this.setState(() => ({
            isAddNew: false,
        }));
    }

    renderSuggestions() 
    {
        const { suggestions } = this.state;
        if(suggestions.length === 0)
        {
            return null;
        }

        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    suggestionSelected(value)
    {
        const { idMap, isEditable } = this.props;
        var personObj = null;
        if(idMap && idMap.size > 0)
            personObj = idMap.get(value);
        this.setState(() => ({
            text: value,
            suggestions: [],
            personData: personObj,
            isPersonLoading: (personObj ? true : false),
            isEditable: isEditable,
        }));
        
    }
    
    render() {
        const { isEditable, tabIndex } = this.props;
        const { text, isPersonLoading, personData, isAddNew } = this.state;
        let typeID = 0;
        if(personData)
            typeID = personData.typeID;
        else
        {
            if(isEditable && !personData)
                typeID = 2;
        }
        return (
            <div>
                <div className="AutoCompleteText">
                    <input type="text"
                        tabIndex={tabIndex}
                        onChange={this.onTextChanged}
                        value={text}
                        ref={el => this.input = el}
                    />
                    {this.renderSuggestions()}
                </div>
                {
                    isEditable
                    ? <input type="button" id="btnNewVisitor" name="btnNewVisitor"
                         onClick={this.clickNewVisitor} value="ADD NEW" />
                    : ''
                }
                <br />
                {
                    isPersonLoading
                    ? <PersonInfo person={personData} />
                    : ''
                }
                {
                    isAddNew && isEditable
                    ? <PersonEntry typeID={typeID} rawName={text} />
                    : ''
                }
                {
                    isAddNew && isEditable
                    ?
                    <table style={{ width: '100%' }}><tr><td style={{ width: '10%' }}>&nbsp;</td>
                    <td style={{ width: '90%' }}>
                    <table>
                    <tr>
                        <td style={{ textAlign: 'left' }}>
                            <input type="button" id="btnSavePerson" name="btnSavePerson" value="SAVE" />
                            &nbsp;&nbsp;
                            <input type="button" id="btnCancelAdd" name="btnCancelAdd" onClick={this.clickCancelAdd} value="CANCEL" />
                        </td>
                    </tr>
                    </table>
                    </td>
                    </tr></table>
                    : ''
                }
            </div>
        );
    }
}