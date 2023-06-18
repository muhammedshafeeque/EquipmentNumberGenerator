import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
function CreateRandom() {
  const [lgShow, setLgShow] = useState(false);
  const [inputFields, setInputFields] = useState([
    { head: "", type: "", defaultValue: "" },
  ]);
  return (
    <>

    <Button className="btn btn-sm btn-warning mt-4" onClick={()=>{setLgShow(true)}}>Select Random </Button> 
    
      

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
             Set
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
         
                // handleSubmit();
              
            }}
          >
            <div className="col-md-6">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                name="setName"
                // value={name}
          
                placeholder="Enter Name"
                required
              />
            </div>
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className="row col-md-12 mt-4">
                  <div className="col-md-3">
                    <Form.Label>Label</Form.Label>
                    <Form.Control
                      placeholder="Enter label"
                      name="head"
                      type="text"
                      value={inputField.head}
                     
                    />
                  </div>
                  <div className="col-md-3">
                    <Form.Label> Data Type</Form.Label>
                    <Form.Select
                      name="type"
                      required
                      value={inputField.type}
                     
                    >
                      <option value={"String"}>String</option>
                      <option value="Number">Number</option>
                      <option value="Date">Date</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-3">
                    <Form.Label>Default Value</Form.Label>
                    <Form.Control
                      type={
                        inputField.type === "Date"
                          ? "date"
                          : inputField.type === "Number"
                          ? "number"
                          : "text"
                      }
                      placeholder="Enter Default Value"
                      required
                      name="defaultValue"
                      value={inputField.defaultValue}
                    
                    />
                  </div>
             
                </div>
              </Fragment>
            ))}

            <Button variant="primary" className="mt-5" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateRandom;
