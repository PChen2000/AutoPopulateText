import React from 'react';
import PropTypes from 'prop-types';
import './PersonEntry.css';

export default class PersonEntry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            personObj: null,
        };
    }

    render()
    {
        const { typeID } = this.props;
        const { personObj } = this.state;
        return(
            <div className="PersonEntry">
            <table style={{ width: '100%' }}><tr><td style={{ width: '10%' }}>&nbsp;</td>
            <td style={{ width: '90%' }}>
            <table>
                <tr>
                    <th style={{ width: '28%', textAlign: 'left' }}>
                        <label>Last Name:</label>
                    </th>
                    <td style={{ width: '2%' }}>
                        &nbsp;
                    </td>
                    <td style={{ width: '70%' }}>
                        <input type="text" id="txtLastName" name="txtLastName" tabIndex="0" />
                    </td>
                </tr>
                <tr>
                    <th style={{ textAlign: 'left' }}>
                        <label>First Name:</label>
                     </th>
                     <td>&nbsp;</td>
                     <td>
                        <input type="text" id="txtFirstName" name="txtFirstName" tabIndex="1" />
                    </td>
                </tr>
                <tr>
                    <th style={{ textAlign: 'left' }}>
                        <label>Organization:</label>
                    </th>
                    <td>&nbsp;</td>
                    <td>
                        <input type="text" id="txtOrganization" name="txtOrganization" tabIndex="2" />
                    </td>
                </tr>
                <tr>
                    <th style={{ textAlign: 'left' }}>
                        <label>Phone/ Extension:</label>
                    </th>
                    <td>&nbsp;</td>
                    <td>
                        <input type="text" id="txtPhone" name="txtPhone" tabIndex="3" />
                    </td>
                </tr>
                <tr>
                    <th style={{ textAlign: 'left' }}>
                        <label>E-Mail:</label>
                    </th>
                    <td>&nbsp;</td>
                    <td>
                        <input type="text" id="txtEMail" name="txtEMail" tabIndex="4" />
                    </td>
                </tr>
            </table>
            </td>
            </tr></table>
            </div>
        );
    }
}