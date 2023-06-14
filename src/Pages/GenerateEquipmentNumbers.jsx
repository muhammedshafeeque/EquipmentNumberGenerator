import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, ProgressBar, Row } from "react-bootstrap";
import validator from "container-validator";
import { useNavigate } from "react-router-dom";
import { Store } from "../Context/Store";

// import rn from "random-number";

const GenerateEquipmentNumbers = () => {
  const {setEquipments}=Store()
  const navigate = useNavigate();
  const vali = new validator();
  const [prifix, setPrifix] = useState("");
  const [count, setCount] = useState(0);
  const [containerNumbers, setContainerNumber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progres,setProgress]=useState(0)
  const toast=useToast()
  // const gen = rn.generator({
  //   min: 1000000,
  //   max: 10000000,
  //   integer: true,
  // });
  const Generate = () => {
    setContainerNumber([]);
    setLoading(true);
    let numbers = [];
    let i = 1000000;
    if(prifix[prifix.length-1].toUpperCase()==='U'||'J'||'Z'){
      while (numbers.length <= count) {
        i = i + 1;
        // let n = gen();
        let containerNumber = prifix.toUpperCase() + i;
  
        if (vali.isValid(containerNumber)) {
          numbers.push(containerNumber);
          setProgress((numbers.length*100)/count)
        }
        if (i === 1000000000) {
          break;
        }
      }
      setLoading(false);
      setContainerNumber([containerNumbers, ...numbers]);
    }else{
      toast({
        title: 'invalid Prifix',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false);
    }
   
  };

  return (
    <div style={{ padding: "10px" }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Text mt={5} fontSize={"30px"}>
          Generate Container Numbers
        </Text>
      </Box>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          Generate();
        }}
      >
        <Row className="ml-3 col-md-12">
          <div className="col-md-3">
            <Form.Label>PRIFIX </Form.Label>
            <Form.Control
              type="text"
              minLength={4}
              maxLength={4}
              placeholder="Enter prifix"
              required
              value={prifix}
              onChange={(e) => {
                setPrifix(e.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <Form.Label>COUNT </Form.Label>

            <Form.Control
              required={true}
              type="number"
              placeholder="Enter count"
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />
          </div>
          <div className="col-md-3 pt-2">
          <Button
                colorScheme="blue"
                mt={5}
                onClick={()=>{
                  setPrifix('')
                  setCount()
                  setContainerNumber([])
                  setProgress(0)
                }}
                isLoading={loading}
                mr={2}
              
              >
                Clear
              </Button>
            {loading ? (
              "Loading..."
            ) : (
              <Button
                colorScheme="green"
                mt={5}
                isLoading={loading}
                type="submit"
              >
                Generate
              </Button>
            )}
          </div>
        </Row>
      </Form>
      {containerNumbers.length ? (
        <Box display={"flex"} mt={5} justifyContent={"flex-end"} width={"100%"}>
          <Button
            colorScheme="green"
            onClick={() => {
              setEquipments(containerNumbers)
              navigate("/excel");
            }}
          >
            Generate Execl
          </Button>
        </Box>
      ) : (
        ""
      )}
      {progres>0&&<ProgressBar now={progres}/>}

      <Box mt={5} p={5} display={"flex"} flexWrap={"wrap"}>
        {containerNumbers.map((num) => {
          return <p key={num}>{num} , </p>;
        })}
      </Box>
    </div>
  );
};
export default GenerateEquipmentNumbers;
