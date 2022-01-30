import React, { useEffect, useState } from 'react';

function EmailInput({ placeholder, callBack, error, msg, tabFalse }) {
    const [value, setValue] = useState('') //init 
    const update = (e) => {
        setValue(e.target.value)
        validate(e)
    }
    const validate = (e) => {
        if (validEmail(e.target.value)) {
            callBack(e.target.value)
        } else {
            callBack('')
        }
    }
    const validEmail = (email) => {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
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
            <input className='input-control' placeholder={placeholder} value={value} onChange={e => update(e)} onKeyDown={e => tab(e)} onBlur={e => validate(e)} type="email" />
            <p className={'error ' + error}>{msg}</p>
        </div>
    );
}

export default EmailInput;

