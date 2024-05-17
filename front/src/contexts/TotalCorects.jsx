import { createContext, useState } from "react";

export const TotalCorrectsContext = createContext();

export const TotalCorrectsContextProvider = ({ children }) => {
  const [totalCorrects, setTotalCorrects] = useState({
    Sum: 0,
    Subtract: 0,
    Multiply: 0,
    Division: 0,
  });

  const value = { totalCorrects, setTotalCorrects };

  return (
    <TotalCorrectsContext.Provider value={value}>
      {children}
    </TotalCorrectsContext.Provider>
  );
};
