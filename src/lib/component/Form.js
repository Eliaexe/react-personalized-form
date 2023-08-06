import React from "react";
import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Modal(props) {
  const formStructure = props.input;
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputDate, setInputDate] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToUse = {};
      
    const wrappers = document.querySelectorAll(".input-wrapper")
    wrappers.forEach(container => {
        let input = container.querySelector("input")
        let selectElement = input.parentElement.parentElement.children[0]
        let valueToGive

        if (container.dataset.type === 'select') {
          let isRequired = formStructure[container.dataset.name][0]
          if (!isRequired && selectElement.innerHTML === 'Select...') {
            valueToGive = ""
          } else {
            valueToGive = selectElement.innerHTML 
          }

        } else {
          valueToGive = input.value
        }
        dataToUse[container.dataset.name] = valueToGive;
    });
    props.onSubmit(dataToUse)
  };


  const handleChangeDate = (name, date) => {
    const existingDataIndex = inputDate.findIndex((data) => data.name === name);

    if (existingDataIndex !== -1) {
      setInputDate((prevInputDate) =>
        prevInputDate.map((data, index) =>
          index === existingDataIndex ? { ...data, date } : data
        )
      );
    } else {
      setInputDate((prevInputDate) => [...prevInputDate, { name, date }]);
    }
  };

  const renderModal = () => {
    const inputElements = [];
  
    for (const input in formStructure) {
        let theElement
      if (Object.hasOwnProperty.call(formStructure, input)) {
        const type = formStructure[input];
        const metadata = input.toLowerCase().split(" ").join("_");
        const isRequired = type[0] === true;
  
        if (type[1] !== "select" && type[1] !== "date") {
          theElement = (
            <div className="input-wrapper" key={metadata} data-name={input} data-type={type[1]}>
              <label htmlFor={metadata}>{input}</label>
              <input type={type[1]} id={metadata} required={isRequired} />
            </div>
          );
        } else if (type[1] === "select") {
          theElement = (renderSelectInput(input, type[2], metadata));
        } else if (type[1] === "date") {
          theElement = (renderDateInput(input, metadata));
        }
      }
      inputElements.push(theElement)
    }
    return inputElements;
  };

  const renderSelectInput = (name, selection, metadata) => {
    const options = [];
    selection.forEach((e) => {
      options.push({
        value: e.toLowerCase(),
        label: e,
      });
    });
  
    const isRequired = formStructure[name][0];
  
    return (
      <div className="input-wrapper" key={metadata} data-name={name} data-type={'select'}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          className={metadata}
          options={options}
          required={isRequired}
        />
      </div>
    );
  };
  
  const renderDateInput = (name, metadata) => {
    const isRequired = formStructure[name][0];
  
    return (
      <div className="input-wrapper" key={metadata} data-name={name} data-type={'date'}>
        <label htmlFor={metadata}>{name}</label>
        <DatePicker
          selected={inputDate.find((data) => data.name === name)?.date || null}
          onChange={(date) => handleChangeDate(name, date)}
          required={isRequired} 
        />
      </div>
    );
  };
  return (
    <section className="modal">
      <form className="form" id="form" onSubmit={handleSubmit}>
        <h1>{props.modalName}</h1>
        {renderModal()}
        <button id="submit" className="save-button" type="submit">
          {props.submitButton}
        </button>
      </form>
    </section>
  );
}
