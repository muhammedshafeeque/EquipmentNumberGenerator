import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
function CreateRandom(props) {
  const [lgShow, setLgShow] = useState(false);
  const [newConfig, setNewConfig] = useState(false);
  const [name, setName] = useState("");
  const [inputFields, setInputFields] = useState([]);

  return (
    <>
      <Button
        className="btn btn-sm btn-warning mt-4"
        onClick={() => {
          setLgShow(true);
        }}
      >
        Select Random For {props.set.name}
      </Button>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Set Random For {props.set.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              // handleSubmit();
            }}
          >
            <Row>
              <div className="col-md-6">
                <Form.Label>Select Config</Form.Label>
                <Form.Select name="Config">
                  <option></option>
                </Form.Select>
              </div>
              <div className="col-md-6 mt-2">
                <Button variant="success" className="btn-sm mt-4 mr-3">
                  Applay
                </Button>
                <Button
                  variant="primary"
                  className="btn-sm mt-4 mr-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setInputFields(props.set.tables);
                    setNewConfig(true);
                  }}
                >
                  Create new Config
                </Button>
                <Button variant="danger" className="btn-sm mt-4">
                  Edit Config
                </Button>
              </div>
            </Row>
            {newConfig && (
              <>
                <Row>
                  {/* <div className="col-md-6">
              <Form.Label>Select Set</Form.Label>
              <Form.Select name="Select Config">
                <option value=""></option>
              </Form.Select>
            </div> */}
                  <div className="col-md-6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      placeholder="Config Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                    />
                  </div>
                </Row>

                {inputFields.map((inputField, index) => (
                  <Fragment key={`${inputField}~${index}`}>
                    <div className="row col-md-12 mt-4">
                      <div className="col-md-2">
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                          placeholder="Enter label"
                          name="head"
                          type="text"
                          value={inputField.head}
                          disabled
                        />
                      </div>
                      <div className="col-md-2">
                        <Form.Label> Data Type</Form.Label>
                        <Form.Select
                          name="type"
                          required
                          value={inputField.type}
                          disabled
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
                          disabled
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
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateRandom;
