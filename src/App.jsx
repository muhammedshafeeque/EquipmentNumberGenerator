import React, { Suspense } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import ExcelDataSet from "./Pages/ExcelDataSet";
import GenerateExcel from "./Pages/GenerateExcel";
import GenerateEquipmentNumbers from "./Pages/GenerateEquipmentNumbers";

function App() {
  // const GenerateEquipmentNumbers = React.lazy(() =>
  //   import("./Pages/GenerateEquipmentNumbers")
  // );
  // const ExcelGenerator = React.lazy(() => import("./Pages/ExcelDataSet"));
  // const Excel=React.lazy(()=>import('./Pages/GenerateExcel'))
  return (
    <div className="App">
      <Header />
      <Suspense
        fallback={
          <div>
            <p>Loading ....</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<GenerateEquipmentNumbers/>} />
          <Route path="/sets" element={<ExcelDataSet/>} />
          <Route path="/excel" element={<GenerateExcel/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
