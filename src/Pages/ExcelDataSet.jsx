import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import SetCreate from "../Components/SetCreateModal/SetCreate";
import { SETS } from "../Constant/Constant";

function ExcelDataSet() {
  const [sets, setSets] = useState();
  const [reset, setReset] = useState();
  useEffect(() => {
    setSets(JSON.parse(localStorage.getItem(SETS)));
  }, [reset]);
  return (
    <div style={{ padding: "10px" }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Text mt={5} fontSize={"30px"}>
          Generate Sets
        </Text>
      </Box>
      <div className="col-md-12">
        <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
          <SetCreate setReset={setReset} />
        </Box>
        <Table striped="columns">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number Of Columns</th>
            </tr>
          </thead>
          <tbody>
            {sets &&
              sets.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.tables.length}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ExcelDataSet;
