import React from 'react'

export default props => (
        <div className={props.classe}>
            <label htmlFor={props.name}>{props.label}</label>
            <input {...props.input} value={props.value} onChange={props.onChange} placeholder={props.placeholder}
                 readOnly={props.readOnly} type={props.type} />
        </div>
)