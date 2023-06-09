import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { SETS } from "../../Constant/Constant";
function SetCreate({setReset}) {
  const [lgShow, setLgShow] = useState(false);
  const [inputFields, setInputFields] = useState([
    { head: "", type: "", defaultValue: "" },
  ]);
  const [name, setname] = useState();
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ head: "", type: "", defaultValue: "" });
    setInputFields(values);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "head") {
      values[index].head = event.target.value;
    } else if (event.target.name === "type") {
      values[index].type = event.target.value;
    } else {
      values[index].defaultValue = event.target.value;
    }

    setInputFields(values);
  };
  const handleSubmit = () => {
    let sets = JSON.parse(localStorage.getItem(SETS));
    if (sets && sets.length) {
      sets.push({ name: name, tables: inputFields });
      localStorage.setItem(SETS, JSON.stringify(sets));
    } else {
      let set = [{ name: name, tables: inputFields }];
      localStorage.setItem(SETS, JSON.stringify(set));
    }
    setInputFields([{ head: "", type: "", defaultValue: "" }]);
    setname("");
    setReset(sets)
    setLgShow(false);
  };

  return (
    <>
      <Button onClick={() => setLgShow(true)}>Create Set</Button>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Set
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="col-md-6">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                name="setName"
                onChange={(e) => {
                  e.preventDefault();
                  setname(e.target.value);
                }}
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
                      onChange={(event) => handleInputChange(index, event)}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <Form.Label> Data Type</Form.Label>
                    <Form.Select
                      name="type"
                      required
                      value={inputField.type}
                      onChange={(event) => handleInputChange(index, event)}
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
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </div>
                  <div className="col-md-3 pt-2" style={{ display: "flex" }}>
                    <Button
                      className="btn btn-success btn-sm mt-4"
                      onClick={handleAddFields}
                    >
                      New Row
                    </Button>
                    {index !== 0 && (
                      <Button
                        className="btn btn-danger btn-sm mt-4"
                        onClick={handleRemoveFields}
                      >
                        Delete
                      </Button>
                    )}
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

export default SetCreate;
