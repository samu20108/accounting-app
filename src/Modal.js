import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";

function Modal() {
  const [inputError, setInputError] = useState(false);
  const [title, setTitle] = useState();
  const nameInput = useRef(null);
  const amountInput = useRef(null);
  const formRef = useRef();
  const { isModalOpen, closeModal, addDebt, addLoan, modalType } =
    useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Checks if the input is correct
    if (nameInput.current.value && parseFloat(amountInput.current.value) > 0) {
      const name = nameInput.current.value;
      const amount = amountInput.current.value;
      if (modalType === "debt") {
        addDebt(name, amount);
      } else if (modalType === "loan") {
        addLoan(name, amount);
      }
      formRef.current.reset();
      closeModal();
      setInputError(false);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 2000);
    }
  };
  //Sets modal title and focus to input
  useEffect(() => {
    if (modalType === "debt") {
      setTitle("velka");
    }
    if (modalType === "loan") {
      setTitle("saatava");
    }
    nameInput.current.focus();
  }, [isModalOpen, modalType]);

  return (
    <div className={`${isModalOpen ? "overlay show" : "overlay"}`}>
      <div className="modal">
        <button className="del-btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <form ref={formRef} onSubmit={handleSubmit}>
          <h1>{`Uusi ${title}`}</h1>
          <label htmlFor="name">Nimi:</label>
          <input type="text" name="name" ref={nameInput}></input>
          <label htmlFor="amount">Summa:</label>
          <input
            type="text"
            className="amount"
            name="amount"
            ref={amountInput}
            placeholder="€"
          ></input>
          <div className="result">
            {inputError ? (
              <h3 className="error">{`Syötä nimi ja summa `}</h3>
            ) : null}
          </div>
          <button className="btn" type="submit">
            Lisää
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
