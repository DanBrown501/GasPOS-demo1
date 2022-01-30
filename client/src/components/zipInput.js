import React, { useEffect, useState } from 'react';

function ZipInput({ placeholder, callBack, error, msg, tabFalse }) {
    const [value, setValue] = useState('')
    const update = (e) => {
        setValue(e.target.value.replace(/[^0-9]/g, ""))
        validate(e.target.value.replace(/[^0-9]/g, ""))
    }
    const validate = (val) => {
        if (val.length === 5) {
            callBack(val)
        } else {
            callBack('')
        }
    }
    const tab = (event) => {
        if (tabFalse === true) {
            if (event.key == "Tab") {
                event.preventDefault();
            }
        }
    }
    return (
        <div className="input-wrapper pl pr">
            <input className='input-control' placeholder={placeholder} value={value} onChange={e => update(e)} onBlur={e => validate(e.target.value)} type="tel" pattern="[0-9]*" maxLength="5" onKeyDown={e => tab(e)} />
            <p className={'error ' + error}>{msg}</p>
        </div>
    );
}

export default ZipInput;

