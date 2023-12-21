import React from 'react'

function Input({title, id, type, name, value, onChange, errors, ontouch, onBlur}) {
    return (
        <div className='mb-4'>
            <label className='form-label w-100 text-start'>{title}</label>
            <input id={id} name={name} type={type} className='form-control' value={value} onChange={onChange} onBlur={onBlur}></input>
            {errors[name] && ontouch[name] &&  <p className='text-danger w-100 text-start'>{errors[name]}</p>}
        </div>
    )
}

export default Input