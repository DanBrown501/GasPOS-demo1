import React, { useEffect, useState } from 'react';

function DateInput({ placeholder, callBack, error, msg, tabFalse }) {
    const [value, setValue] = useState('') //init 
    const [type, setType] = useState('')
    const update = (e) => {
        setValue(e.target.value)
        callBack(e.target.value)
    }
    const validate = (e) => {
        if (e.target.value != '') {
            setType("date")
            let year = e.target.value.split('-');
            console.log(year);
            if (parseInt(year, 10) > 2004) {
                callBack('');
                setValue('')
            }
        } else {
            setType("")
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
        <div className="input-wrapper">
            <input className='input-control' placeholder={placeholder} value={value} onChange={e => update(e)} onKeyDown={e => tab(e)} onFocus={() => setType("date")} onBlur={e => validate(e)} type={type} max='2004-01-01' />
            <p className={'error ' + error}>{msg}</p>
        </div>
    );
}

export default DateInput;

