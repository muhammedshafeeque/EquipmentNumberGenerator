import { useContext, useState } from "react";
import { createContext } from "react";

const StoreContext = createContext();
const EquipmentProvider = ({ children }) => {
  const [equipments, setEquipments] = useState([]);
  return <StoreContext.Provider value={{setEquipments,equipments}}>{children}</StoreContext.Provider>;
};
export default EquipmentProvider;
export const Store = () => {
  return useContext(StoreContext);
};
