import { useGlobalContext } from "./context";
import { FaTimes } from "react-icons/fa";

function Table() {
  const { openModal, debts, loans, debtSum, loanSum, setModalType, deleteRow } =
    useGlobalContext();

  const openDebtModal = () => {
    setModalType("debt");
    openModal();
  };
  const openLoanModal = () => {
    setModalType("loan");
    openModal();
  };

  return (
    <div className="container">
      <h1>Kirjanpito</h1>
      <div className="tables-container">
        <div>
          <h2>Velat</h2>
          <table
            className={`${debtSum > 0 ? "debts-table show" : "debts-table"}`}
          >
            <thead>
              <tr>
                <th>Keneltä:</th>
                <th colSpan="2">Summa:</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt) => {
                return (
                  <tr key={debt.id}>
                    <td>{debt.name}</td>
                    <td>{`${debt.amount.toFixed(2)}€`}</td>
                    <td>
                      <button
                        className="del-btn"
                        onClick={() => deleteRow(debts, debt.id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {debtSum > 0 ? (
            <h4 className="sum">{`Velat yhteensä: ${debtSum}€`}</h4>
          ) : (
            <h4 className="sum">Ei velkoja</h4>
          )}
          <button className="btn" onClick={openDebtModal}>
            Lisää velka
          </button>
        </div>
        <div>
          <h2>Saatavat</h2>
          <table
            className={`${loanSum > 0 ? "loans-table show" : "loans-table"}`}
          >
            <thead>
              <tr>
                <th>Kenelle:</th>
                <th>Summa:</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                return (
                  <tr key={loan.id}>
                    <td>{loan.name}</td>
                    <td>{`${loan.amount.toFixed(2)}€`}</td>
                    <td>
                      <button
                        className="del-btn"
                        onClick={() => deleteRow(loans, loan.id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {loanSum > 0 ? (
            <h4 className="sum">{`Saatavat yhteensä: ${loanSum}€`}</h4>
          ) : (
            <h4 className="sum">Ei saatavia</h4>
          )}
          <button className="btn" onClick={openLoanModal}>
            Lisää saatava
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
