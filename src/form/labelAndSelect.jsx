import React from 'react'

export default props => (
        <div className={props.classe}>
            <label htmlFor={props.name}>{props.label}</label>
            <select {...props.select} onChange={props.onChange} name="coins">
                <option value="BRL">BRL</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
            </select>
        </div>
)