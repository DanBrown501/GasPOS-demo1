import React from 'react';
import alloy from 'alloyidentity/web-sdk';

const alloyInitParams = {
  documents: ['license', 'passport'],
  selfie: true,
  evaluationData: {
    name_first: fName,
    name_last: lName,
    email_address: email,
    birth_date: dob,
    address_line_1: address,
    address_line_2: address2,
    address_city: city, address_state: state,
    phone_number: phone,
    document_ssn: SSN, address_postal_code: zip
  },
  // color: { primary: '#CD7D2D', secondary: '#862633' }
  // forceMobile: true
};
alloy.init(alloyInitParams);

function Selfie() {
  // Callback
  const callback = data => {
    console.log(data);
  };

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
    <>
      <div className="App">
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
    </>
  );
}

export default Selfie;