import { Box, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { SETS } from "../Constant/Constant";
import * as XLSX from "xlsx";
import { convertExceltoJosn } from "../Functions/BasicLogic";
function GenerateExcel() {
  const toast=useToast()
  const [containers, setContainers] = useState([]);
  const [set, setSet] = useState(null);
  const [sets, setSets] = useState([]);
  useEffect(() => {
    setSets(JSON.parse(localStorage.getItem(SETS)));
  }, []);
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
        setContainers([...containers,rJson])
      };
      reader.readAsBinaryString(f);
    } else {
      toast({
        title: 'error',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
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
          <Row className="mt-4">
            <div className="col-md-3">
              <label htmlFor="">Select Excel Mode</label>
              <Form.Select>
                {sets.map((item, i) => {
                  return (
                    <option key={i} value={item}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </Row>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ContainerNumber</th>
              <th>First Name</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((item,i)=>{
             return <tr key={i} >
              <td>{item.ContainerNumber}</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            })}
            
            
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default GenerateExcel;
