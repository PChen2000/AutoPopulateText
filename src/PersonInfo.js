import React from 'react';
import PropTypes from 'prop-types';
import { departments } from './data/employees.js';
import './PersonInfo.css';

function getDepartmentName(deptID)
{
    if(!departments || departments.length === 0
    || deptID <= 0)
        return '';
    const results
        = departments
        .filter(v => v.departmentID === deptID);
    let department = null;
    if(results.length > 0)
        department = results[0];
    if(!department)  return '';
    return department.name;
}

export default class PersonInfo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            // TBD
        };
    }

    render() {
        const { person } = this.props;
        let departmentName = '';
        if(person.typeID && person.typeID === 1)
            departmentName
                = getDepartmentName(person.departmentID);
        return (
            <div className="PersonInfo">
                <table>
                    <tr>
                        <td style={{textAlign: 'left', fontWeight: 'bold', width: '20%'}}>
                            Name:
                        </td>
                        <td style={{textAlign: 'left', width: '80%'}}>
                            {person.first + ' ' + person.last}
                        </td>
                    </tr>
                    {
                        (!person.title || person.title === '')
                        ? ''
                        : <tr>
                            <td style={{textAlign: 'left', fontWeight: 'bold',}}>
                                Title:
                            </td>
                            <td style={{textAlign: 'left',}}>
                                {person.title}
                            </td>
                        </tr>
                    }
                    {
                        (!person.organization || person.organization === '')
                        ? ''
                        :
                        <tr>
                            <td style={{textAlign: 'left', fontWeight: 'bold',}}>
                                Organization:
                            </td>
                            <td style={{textAlign: 'left',}}>
                                {person.organization}
                            </td>
                        </tr>
                    }
                    {
                        (departmentName === '')
                        ? ''
                        :
                        <tr>
                            <td style={{textAlign: 'left', fontWeight: 'bold',}}>
                                Department:
                            </td>
                            <td style={{textAlign: 'left',}}>
                                {departmentName}
                            </td>
                        </tr>
                    }
                    {
                        (!person.phone || person.phone === '')
                        ? ''
                        :
                        <tr>
                            <td style={{textAlign: 'left', fontWeight: 'bold',}}>
                                Phone/ Ext.:
                            </td>
                            <td style={{textAlign: 'left',}}>
                                {person.phone}
                            </td>
                        </tr>
                    }
                    {
                        (!person.email || person.email === '')
                        ? ''
                        :
                        <tr>
                            <td style={{textAlign: 'left', fontWeight: 'bold',}}>
                                E-Mail:
                            </td>
                            <td style={{textAlign: 'left',}}>
                                {person.email}
                            </td>
                        </tr>
                    }
                </table>
            </div>
        );
    }

}