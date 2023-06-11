import React, { Suspense } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  const GenerateEquipmentNumbers = React.lazy(() =>
    import("./Pages/GenerateEquipmentNumbers")
  );
  const ExcelGenerator = React.lazy(() => import("./Pages/ExcelDataSet"));
  const Excel=React.lazy(()=>import('./Pages/GenerateExcel'))
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
          <Route path="/" element={<GenerateEquipmentNumbers />} />
          <Route path="/sets" element={<ExcelGenerator />} />
          <Route path="/excel" element={<Excel/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
