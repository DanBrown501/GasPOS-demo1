import React, { useEffect, useState } from 'react';

function Input({ placeholder, callBack, error, msg, tabFalse }) {
    const [value, setValue] = useState('') //init 
    const update = (e) => {
        setValue(e.target.value)
        callBack(e.target.value)
    }
    const tab = (event) => {
        if (tabFalse === true) {
            if (event.key == "Tab") {
                event.preventDefault();
            }
        }
    }
    return (
        <div className="input-wrapper">
            <input className='input-control' placeholder={placeholder} value={value} onChange={e => update(e)} onKeyDown={e => tab(e)} />
            <p className={'error ' + error}>{msg}</p>
        </div>
    );
}

export default Input;

