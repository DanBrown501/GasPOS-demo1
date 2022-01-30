import React, { useEffect, useState } from 'react';

function CharInput({ placeholder, callBack, error, msg }) {
    const [value, setValue] = useState('')
    const update = (e) => {
        setValue(e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase())
    }
    const validate = (val) => {
        if (val.length == 2) {
            if (stateValid(val)) {
                callBack(val)
            } else {
                callBack('')
            }
        } else {
            callBack('')
        }
    }
    const stateValid = (state) => {
        return state.match(/^(([Aa][EeLlKkSsZzRr])|([Cc][AaOoTt])|([Dd][EeCc])|([Ff][MmLl])|([Gg][AaUu])|([Hh][Ii])|([Ii][DdLlNnAa])|([Kk][SsYy])|([Ll][Aa])|([Mm][EeHhDdAaIiNnSsOoTt])|([Nn][EeVvHhJjMmYyCcDd])|([Mm][Pp])|([Oo][HhKkRr])|([Pp][WwAaRr])|([Rr][Ii])|([Ss][CcDd])|([Tt][NnXx])|([Uu][Tt])|([Vv][TtIiAa])|([Ww][AaVvIiYy]))$/)
    }
    return (
        <div className="input-wrapper pl pr">
            <input className='input-control' placeholder={placeholder} value={value} onChange={e => update(e)} onBlur={e => validate(e.target.value)} type="tel" maxLength="2" />
            <p className={'error ' + error}>{msg}</p>
        </div>
    );
}

export default CharInput;

