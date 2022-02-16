import React, { useState } from "react";
import Input from "../components/input"
import ZipInput from "../components/zipInput";
import CharInput from "../components/charInput";
import SsnInput from "../components/ssn";
import DateInput from "../components/date";
import EmailInput from "../components/emailInput";
import PhoneInput from "../components/phoneInput";
import alloy from '@alloyidentity/web-sdk';

/*
 To prevent continue of slides until all inputs are complete, usestate is given into inputs as a prop, using it as a callback function
 this gives the ability to read state outside of the component without redux.
*/


const alloyInitParams = {
  key: '028d85e0-aa24-4ca1-99f2-90e3ee3f4e6b',
  // entityToken: 'P-nCLYNtmujqr9ZPwQ0C9S',
  // externalEntityId: 'P-nCLYNtmujqr9ZPwQ0C9S',
  documents: ['license', 'passport'],
  selfie: true,
  evaluationData: {
    nameFirst: 'John',
    nameLast: 'Beta',
    addressLine1: 'Address Line 1. C - left door',
    addressLine2: 'Secondary address. 2ºB',
    addressCity: 'City address',
    addressState: 'TX',
    addressPostalCode: '+419550',
    addressCountryCode: 'VI',
    birthDate: '2020-03-03',
  },
  // color: { primary: '#CD7D2D', secondary: '#862633' }
  // forceMobile: true
};
alloy.init(alloyInitParams);

function Home() {
  const [count, setCount] = useState(0); // counter for slides
  const [fName, setFname] = useState('');
  const [fnameError, setFnameError] = useState('hide')
  const [lName, setLname] = useState('');
  const [lnameError, setLnameError] = useState('hide')
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('hide')
  const [address2, setAddress2] = useState('');
  const [addressError2, setAddressError2] = useState('hide')
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('hide')
  const [state, setState] = useState('');
  const [stateError, setStateError] = useState('hide')
  const [zip, setZip] = useState('');
  const [zipError, setZipError] = useState('hide')
  const [SSN, setSSN] = useState('');
  const [SSNError, setSSNError] = useState('hide')
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('hide')
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('hide')
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('hide')
  const [outcome, setOutcome] = useState('')
  const callback = data => {
    console.log(data);
  };
  const next = () => {
    if (count === 0) {
      if (fName === '') {
        setFnameError('show')
      } else {
        setFnameError('hide')
      }
      if (lName === '') {
        setLnameError('show')
      } else {
        setLnameError('hide')
      }
      if (fName != '' && lName != '') {
        // Here the count is incremented by 1 when the inputs are valid
        setCount(count + 1)
        setFnameError('hide'); setLnameError('hide')
      }
    }
    // Here the count is checked to see if the first slide has been completed and incremented. If so, the slide will continue
    else if (count === 1) {
      if (address === '') {
        setAddressError('show')
      } else {
        setAddressError('hide')
      }
      if (city === '') {
        setCityError('show')
      } else {
        setCityError('hide')
      }
      if (state === '') {
        setStateError('show')
      } else {
        setStateError('hide')
      }
      if (zip === '') {
        setZipError('show')
      } else {
        setZipError('hide')
      }
      if (address != '' && city != '' && state != '' && zip != '') {
        //Here the count is incremented to 2 after all values have valid inputs
        setCount(count + 1)
        setAddressError('hide'); setCityError('hide'); setStateError('hide'); setZipError('hide')
      }
    } else {
      if (SSN === '') {
        setSSNError('show')
      } else {
        setSSNError('hide')
      }
      if (dob === '') {
        setDobError('show')
      } else {
        setDobError('hide')
      }
      if (email === '') {
        setEmailError('show')
      } else {
        setEmailError('hide')
      }
      if (phone === '') {
        setPhoneError('show')
      } else {
        setPhoneError('hide')
      }
      if (SSN != '' && dob != '' && email != '' && phone != '') {
      //Here the count is incremented to 3 after all values have valid inputs
        setCount(count + 1)
        submit();
        setSSNError('hide'); setDobError('hide'); setEmailError('hide');
      }
    }
  }
  const prev = () => {
    if (count > 0) {
      //decrements if the previous button has been selected
      setCount(count - 1)
    }
  }
  const submit = () => {
    let result = JSON.stringify({
      name_first: fName,
      name_last: lName,
      email_address: email,
      birth_date: dob,
      address_line_1: address,
      address_line_2: address2,
      address_city: city, address_state: state,
      phone_number: phone,
      document_ssn: SSN, address_postal_code: zip
    })
    fetch("/api/onboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: result,
    }).then(res => res.json()).then(data => { { setOutcome(data.result); console.log(data) } })

  }

  const onOpen = () => {
    const anchorElementSelected = document.getElementById('anchors');
    const anchorElement =
      anchorElementSelected.options[anchorElementSelected.selectedIndex].value;
    // The "open" function, allows the use of an optional parameter to mount the alloy modal inside a div identified by its ID or class name.
    // If not specified, it'll be absolute positioned in the middle of the document.
    alloy.open(callback, anchorElement);
  };

  const onClose = () => {
    alloy.close();
  };
  return (
    <div id="app">
      <main>
        <header><h1>GasPOS Onboarding</h1></header>
        <div className="form">
          <div className="slider">
            {/* If counter is less than 1, that means we've just started. Get user's name */}
            <div className={`slide ${count < 1 ? "active" : ""} ${count > 0 ? "complete" : ""}`}>
              <h1>👋 Let's get started</h1>
              <div className="row align-center">
                <div className="marker"></div>
                <p className="subtitle">First, what is your name?</p>
              </div>
              <Input placeholder={"First Name"} callBack={setFname} error={fnameError} msg="Please complete this field"></Input>
              <Input placeholder={"Last Name"} callBack={setLname} error={lnameError} msg="Please complete this field" tabFalse={true}></Input>
            </div>
            {/* If counter is equal to 1, get user's address */}
            <div className={`slide ${count === 1 ? "active" : ""} ${count > 1 ? "complete" : ""}`}>
              <h1>🌎 Where do you live</h1>
              <div className="row align-center">
                <div className="marker"></div>
                <p className="subtitle">Thanks {fName}, now I need your primary residence</p>
              </div>
              <Input placeholder={"Address"} callBack={setAddress} error={addressError} msg="Please complete this field"></Input>
              <Input placeholder={"Address 2"} callBack={setAddress2} error={addressError2} msg="Please complete this field"></Input>
              <Input placeholder={"City"} callBack={setCity} error={cityError} msg="Please complete this field"></Input>
              <div className="row">
                <CharInput placeholder={"State (NY)"} callBack={setState} error={stateError} msg="Please complete this field"></CharInput>
                <ZipInput placeholder={"ZIP"} tabFalse={true} callBack={setZip} error={zipError} msg="Please complete this field"></ZipInput>
                <div className="input-wrapper pl pr">
                  <input className='input-control' placeholder="Country (US)" value="US" disabled />
                </div>
              </div>
            </div>
            {/* If counter is equal to 2, data is valid. Get user's info */}
            <div className={`slide ${count === 2 ? "active" : ""} ${count > 2 ? "complete" : ""}`}>
              <h1>📖 Little more about you</h1>
              <div className="row align-center">
                <div className="marker"></div>
                <p className="subtitle">Just a few more details to complete the application</p>
              </div>
              <SsnInput placeholder={"SSN"} callBack={setSSN} error={SSNError} msg="Please complete this field"></SsnInput>
              <DateInput placeholder={"Date of Birth (MM/DD/YYYY)"} callBack={setDob} error={dobError} msg="Please complete this field"></DateInput>
              <PhoneInput placeholder={"Phone Number"} callBack={setPhone} error={phoneError} msg="Please complete this field"></PhoneInput>
              <EmailInput placeholder={"Email"} callBack={setEmail} error={emailError} msg="Please complete this field"></EmailInput>
            </div>
            {/* If counter is equal to 3, data is valid. submit user's info */}
            <div className={`slide ${count === 3 ? "active" : ""} ${count > 3 ? "complete" : ""}`}>
              <div className="buttonContainer">
                <select name="anchors" id="anchors">
                <option value={undefined}>No anchor</option>
                  <option value="anchorElementContainer1">Left anchor</option>
                  <option value="anchorElementContainer2">Right anchor</option>
                  <option value="anchorElementContainer3">Bottom anchor</option>
                </select>
                <button onClick={onOpen}>Open</button>
                <button onClick={onClose}>Close</button>
          </div>
          <div className="anchorContainer">
            <div className="anchorElementContainer1">(ID: anchor1)</div>
            <div className="anchorElementContainer2">(className: anchor2)</div>
            <div className="anchorElementContainer3">(className: anchor3)</div>
        </div>
            </div>
            {/* If counter is equal to 4, that means all info has been entered. Submit info */}
            <div className={`slide ${count === 4 ? "active" : ""}`}>
              {
                outcome === '' && <div className='blob-loader'>Sending...</div>
              }
              {
                outcome === "Approved" && <> <h1>🎉 Welcome to GasPos Onboarding!</h1>
                  <p>Success! You will receive an email shortly with your next steps.</p></>
              }
              {
                outcome === "Manual Review" && <> <h1>👍 You're almost there!</h1>
                  <p>Thanks for submitting your application, we’ll be in touch shortly.</p></>
              }
              {
                outcome === "Denied" && <> <h1>Sorry, your application was not successful.</h1>
                  <p>Please reach out to our support team at <a href="#">support@gaspos.com</a> for further information</p></>
              }
              {
                outcome === "ERROR" && <> <h1>Sorry, something went wrong</h1>
                  <p>Please try completing the application again, if the issue continues please contact our support team</p></>
              }
            </div>
          </div>
          {count < 4 &&
            <div className="controls">
              {
                count > 0 && <button onClick={prev}>Previous</button>
              }
              {
                count < 3 ? <button onClick={next} className="right">Next</button> : <button onClick={next} className="right submit" onClick={next}>Submit</button>
              }

            </div>
          }
        </div>
        <footer>
          <p><a href="https://www.gaspos.co/"></a></p>
        </footer>
      </main>
      <div className="sidebar">
        <div className="circle-light"></div>
        <div className="circle-dark"></div>
        <div className="card">
          <h1>Thank You for Choosing GasPOS</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
