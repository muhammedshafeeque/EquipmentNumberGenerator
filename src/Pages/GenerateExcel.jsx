import { Box, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { SETS } from "../Constant/Constant";
import * as XLSX from "xlsx";
import {
  GenerateExcelSheet,
  convertExceltoJosn,
} from "../Functions/BasicLogic";
import { Store } from "../Context/Store";
import CreateRandom from "../Components/CreateRandom/CreateRandom";
function GenerateExcel() {
  const toast = useToast();
  const [containers, setContainers] = useState([]);
  const [set, setSet] = useState();
  const [sets, setSets] = useState([]);
  const [skipFrom, setSkipFrom] = useState(0);
  const [skipTo, setSkipTo] = useState(0);
  const { equipments } = Store();
  const [booking, setBookig] = useState(false);
  useEffect(() => {
    setSets(JSON.parse(localStorage.getItem(SETS)));
    if (equipments.length) {
      setBookig(false);
      formateGlobalData();
    }
  }, [equipments]);
  const formateGlobalData = () => {
    let items = [];
    equipments.forEach((value, i) => {
      if (i > 0) {
        items.push({ ContainerNumber: value });
      }
    });
    setContainers(items);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      var f = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        let rJson = convertExceltoJosn(data);
        if (rJson[0].BookingNumber) {
          setBookig(true);
        }
        setContainers(rJson);
      };
      reader.readAsBinaryString(f);
    } else {
      toast({
        title: "error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleSelectSet = async (e) => {
    let item = sets[e.target.value];
    setSet(item);
    let formMatedResults = [];
    let itemObj = {};
    item.tables.forEach((ob) => {
      itemObj[ob.head] = ob.defaultValue;
    });
    await containers.forEach((obj) => {
      if (obj.BookingNumber) {
        setBookig(true);
      }
      itemObj.ContainerNumber = obj.ContainerNumber;
      obj.BookingNumber && (itemObj.BookingNumber = obj.BookingNumber);
      formMatedResults.push(itemObj);
    });
  };
  const handleGenerate = async (e) => {
    e.preventDefault();
    let HEADER_ROW = [{ value: "ContainerNumber" }];
    if (booking) {
      HEADER_ROW.push({ value: "BookingNumber" });
    }
    await set.tables.forEach((item) => {
      HEADER_ROW.push({ value: item.head });
    });
    let Rdata = [HEADER_ROW];
    await containers.forEach(async (item) => {
      Rdata.push(await generateRow(item));
    });

    GenerateExcelSheet(Rdata);
  };
  const generateRow = (data) => {
    let item = [{ value: data.ContainerNumber }];
    if (booking) {
      item.push({ value: data.BookingNumber });
    }
    set.tables.forEach((obj) => {
      let row = {
        value:
          obj.type === "Date"
            ? new Date(obj.defaultValue)
            : obj.type === "Number"
            ? Math.floor(obj.defaultValue)
            : obj.defaultValue,
        type:
          obj.type === "Date" ? Date : obj.type === "Number" ? Number : String,
      };
      obj.type === "Date" && (row.format = "yyyy/mm/dd");
      item.push(row);
    });
    return item;
  };

  return (
    <div style={{ padding: "10px" }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Text mt={5} fontSize={"30px"}>
          Generate Excel
        </Text>
      </Box>
      <div className="col-md-12">
        <Form>
          {!containers.length && (
            <Row>
              <div className="col-md-3">
                <label htmlFor="">Upload Excel </label>
                <Form.Control type="file" onChange={handleAdd} />
              </div>
              <div className="col-md-3 mt-4">
                <Button className="btn-sm" onClick={handleAdd}>
                  Add
                </Button>
              </div>
            </Row>
          )}

          <Row className="mt-4 col-md-12">
            <div className="col-md-3">
              <label htmlFor="">Select Excel Mode</label>
              <Form.Select onChange={handleSelectSet}>
                {sets &&
                  sets.map((item, i) => {
                    return (
                      <option key={i} value={i}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </div>
            <div className="col-md-2">
              <Form.Control
                placeholder="skip From"
                type="number"
                className="mt-4"
              />
            </div>
            <div className="col-md-2">
              <Form.Control
                placeholder="skip To"
                type="number"
                className="mt-4"
              />
            </div>
            <div
              className="col-md-3 "
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                className="btn btn-sm btn-danger mt-4 float-rignt mr-2"
                onClick={() => {
                  setContainers([]);
                }}
                style={{ marginRight: "1 rem" }}
              >
                Clear All Containers
              </Button>
              <Button
                className="btn btn-sm btn-primary mt-4  ml-2 float-rignt"
                onClick={handleGenerate}
              >
                Skip
              </Button>
              {
                set&&<Button
                className="btn btn-sm btn-success mt-4 float-rignt"
                onClick={handleGenerate}
              >
                Generate Excel
              </Button>
              }
              <CreateRandom/>
            </div>
          </Row>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>sl No</th>
              <th>ContainerNumber</th>
              {booking && <th>Boking Number</th>}
              {set &&
                set.tables.map((head, i) => {
                  return <th key={i}>{head.head}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {containers.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{item.ContainerNumber}</td>
                  {item.BookingNumber && <td>{item.BookingNumber}</td>}

                  {set &&
                    set.tables.map((obj, j) => {
                      return <td key={j}>{obj.defaultValue}</td>;
                    })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default GenerateExcel;
