import React, { useState, Fragment, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { CONFIGS } from "../../Constant/Constant";
function CreateRandom(props) {
  const [lgShow, setLgShow] = useState(false);
  const [newConfig, setNewConfig] = useState(false);
  const [name, setName] = useState("");
  const [inputFields, setInputFields] = useState([]);
  const [configs,setConfigs]=useState([])
 
  useEffect(()=>{
    let items=JSON.parse(localStorage.getItem(CONFIGS))
    if(items&&items.length){
      let datas=items.filter((obj)=>{
        return items.name===obj.name
      })
      setConfigs(datas)
    }
  },[props.set])
  const handleSubmit = (e) => {
    let data={configName:name}
      data.tables=inputFields
      localStorage.setItem(CONFIGS,JSON.stringify(data))
      setLgShow(false)
  };
  return (
    <>
      <Button
        className="btn btn-sm btn-warning mt-4"
        onClick={() => {
          setLgShow(true);
          setNewConfig(false)
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
              handleSubmit();
            }}
          >
            <Row>
              <div className="col-md-6">
                <Form.Label>Select Config</Form.Label>
                <Form.Select name="Config">
                  {configs&&configs.length&&configs.map((con,i)=>{
                    return  <option key={i}>{con.configName}</option>
                  })}
                 
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
                      required
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
                      <div className="col-md-3">
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                          placeholder="Enter label"
                          name="head"
                          type="text"
                          value={inputField.head}
                          disabled
                        />
                      </div>
                      <div className="col-md-3">
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
                      <div className="col-md-3 pt-2">
                        <Button
                          className="btn-sm mt-4"
                          variant={inputField.random ? "danger" : "primary"}
                          onClick={(e) => {
                            e.preventDefault();
                            let values = [...inputFields];
                            if (inputField.random) {
                              values[index].random = null;
                            } else {
                              values[index].random = [
                                { from: "", to: "", value: "" },
                              ];
                            }

                            setInputFields(values);
                          }}
                        >
                          {inputField.random ? "Abort" : "Create"}
                        </Button>
                      </div>
                    </div>
                    {inputField.random &&
                      inputField.random.length &&
                      inputField.random.map((item, i) => {
                        return (
                          <Fragment key={`${inputField.head + "random"}~${i}`}>
                            <Row
                              className="mt-3"
                              style={{ paddingLeft: "1rem" }}
                            >
                              <div className="col-md-3 pl-3">
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={item.from}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    let values = [...inputFields];
                                    values[index].random[i].from =
                                      e.target.value;
                                    setInputFields(values);
                                  }}
                                />
                              </div>
                              <div className="col-md-3">
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={item.to}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    let values = [...inputFields];
                                    values[index].random[i].to = e.target.value;
                                    setInputFields(values);
                                  }}
                                />
                              </div>
                              <div className="col-md-3">
                                <Form.Label>Value</Form.Label>
                                <Form.Control
                                  type={
                                    inputField.type === "Date"
                                      ? "date"
                                      : inputField.type === "Number"
                                      ? "number"
                                      : "text"
                                  }
                                  value={item.value}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    let values = [...inputFields];
                                    values[index].random[i].value =
                                      e.target.value;
                                    setInputFields(values);
                                  }}
                                />
                              </div>
                              <Row className="col-md-3 mt-4">
                                <div className="col-md-6 mt-2">
                                  <Button
                                    className="btn btn-sm btn-primary"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      let values = [...inputFields];
                                      values[index].random.push({
                                        from: "",
                                        to: "",
                                        value: "",
                                      });
                                      setInputFields(values);
                                    }}
                                  >
                                    Add{" "}
                                  </Button>
                                </div>
                                {i !== 0 && (
                                  <div className="col-md-6 mt-2">
                                    <Button
                                      className="btn  btn-sm btn-danger"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        let values = [...inputFields];
                                        values[index].random.splice(i, 1);

                                        setInputFields(values);
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                )}
                              </Row>
                            </Row>
                          </Fragment>
                        );
                      })}
                  </Fragment>
                ))}
                <Row className="col-md-12">
                  <div className="col-md-4 float-right">
                    <Button variant="secondary" className="mt-5">
                      Cancel
                    </Button>
                  </div>
                  <div className="col-md-4"></div>

                  <div className="col-md-4">
                    <Button variant="success" className="mt-5" type="submit">
                      Submit & Applay
                    </Button>
                  </div>
                </Row>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateRandom;
