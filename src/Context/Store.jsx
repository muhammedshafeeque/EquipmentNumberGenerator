import { useContext, useState } from "react";
import { createContext } from "react";

const StoreContext = createContext();
const EquipmentProvider = ({ children }) => {
  const [containers, setContainers] = useState();
  return <StoreContext.Provider value={{setContainers,containers}}>{children}</StoreContext.Provider>;
};
export default EquipmentProvider;
export const Store = () => {
  return useContext(StoreContext);
};
