import { useState, useContext, createContext, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [debtSum, setDebtSum] = useState();
  const [loanSum, setLoanSum] = useState();
  const [debts, setDebts] = useState(
    localStorage.getItem("debts-list")
      ? JSON.parse(localStorage.getItem("debts-list"))
      : []
  );
  const [loans, setLoans] = useState(
    localStorage.getItem("loans-list")
      ? JSON.parse(localStorage.getItem("loans-list"))
      : []
  );
  const [debtIdCounter, setDebtIdCounter] = useState(0);
  const [loanIdCounter, setLoanIdCounter] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Adds new debt to list
  const addDebt = (newName, newAmount) => {
    newAmount = parseFloat(newAmount);
    const newId = debtIdCounter;
    const newDebt = { id: newId, name: newName, amount: newAmount };
    setDebtIdCounter(debtIdCounter + 1);
    setDebts([...debts, newDebt]);
  };
  //Adds new loan to list
  const addLoan = (newName, newAmount) => {
    newAmount = parseFloat(newAmount);
    const newId = loanIdCounter;
    const newLoan = { id: newId, name: newName, amount: newAmount };
    setLoanIdCounter(loanIdCounter + 1);
    setLoans([...loans, newLoan]);
  };

  const calculateSum = (list) => {
    return list.reduce(
      (total, current) => (total = total + parseFloat(current.amount)),
      0
    );
  };
  //Calculates new sum if list change
  useEffect(() => {
    const newDebtSum = calculateSum(debts).toFixed(2);
    setDebtSum(newDebtSum);
    localStorage.setItem("debts-list", JSON.stringify(debts));
    console.log("debts-list saved");
  }, [debts]);
  useEffect(() => {
    const newLoanSum = calculateSum(loans).toFixed(2);
    setLoanSum(newLoanSum);
    localStorage.setItem("loans-list", JSON.stringify(loans));
    console.log("loans-list saved");
  }, [loans]);

  const deleteRow = (list, id) => {
    const newList = list.filter((listItem) => listItem.id !== id);
    if (list === debts) {
      setDebts(newList);
    } else if (list === loans) {
      setLoans(newList);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        debts,
        debtSum,
        addDebt,
        loans,
        loanSum,
        addLoan,
        modalType,
        setModalType,
        deleteRow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
