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
function GenerateExcel() {
  const toast = useToast();
  const [containers, setContainers] = useState([]);
  const [set, setSet] = useState();
  const [sets, setSets] = useState([]);
  const { equipments } = Store();
  useEffect(() => {
    setSets(JSON.parse(localStorage.getItem(SETS)));
    if (equipments.length) {
      formateGlobalData();
      console.log(equipments);
    }
  }, []);
  const formateGlobalData = () => {
    let items = [];
    equipments.forEach((value) => {
      items.push({ ContainerNumber: value });
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
      itemObj.ContainerNumber = obj.ContainerNumber;
      formMatedResults.push(itemObj);
    });
  };
  const handleGenerate = async (e) => {
    e.preventDefault();
    let HEADER_ROW = [{ value: "ContainerNumber" }];
    await set.tables.forEach((item) => {
      HEADER_ROW.push({ value: item.head });
    });
    let Rdata = [HEADER_ROW];
    await containers.forEach(async (item) => {
      Rdata.push(await generateRow(item.ContainerNumber));
    });

    GenerateExcelSheet(Rdata);
  };
  const generateRow = (containerNumebr) => {
    let item = [{ value: containerNumebr }];
    set.tables.forEach((obj) => {
      let row = {
        value: obj.type==='Date'? new Date(obj.defaultValue): (obj.type==='Number'?Math.floor(obj.defaultValue):obj.defaultValue),
        type:
          obj.type === "Date"
            ? Date
            : obj.type === "Number"
            ? Number
            : String,
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

          <Row className="mt-4">
            <div className="col-md-3">
              <label htmlFor="">Select Excel Mode</label>
              <Form.Select onChange={handleSelectSet}>
                {sets.length&&sets.map((item,i) => {
                  return (
                    <option key={i} value={i}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-3 ">
              <Button
                className="btn btn-sm btn-success mt-4 float-rignt"
                onClick={handleGenerate}
              >
                Generate Excel
              </Button>
            </div>
          </Row>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ContainerNumber</th>
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
                  <td>{item.ContainerNumber}</td>
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
