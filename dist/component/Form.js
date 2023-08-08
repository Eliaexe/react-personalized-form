"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Form;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _reactSelect = _interopRequireDefault(require("react-select"));
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function Form(props) {
  const formStructure = props.input;
  const [selectedOption, setSelectedOption] = (0, _react.useState)(null);
  const [inputDate, setInputDate] = (0, _react.useState)([]);
  const handleSubmit = e => {
    e.preventDefault();
    const dataToUse = {};
    const wrappers = document.querySelectorAll(".input-wrapper");
    wrappers.forEach(container => {
      let input = container.querySelector("input");
      let selectElement = input.parentElement.parentElement.children[0];
      let valueToGive;
      if (container.dataset.type === 'select') {
        let isRequired = formStructure[container.dataset.name][0];
        if (!isRequired && selectElement.innerHTML === 'Select...') {
          valueToGive = "";
        } else {
          valueToGive = selectElement.innerHTML;
        }
      } else {
        valueToGive = input.value;
      }
      dataToUse[container.dataset.name] = valueToGive;
    });
    props.onSubmit(dataToUse);
  };
  const handleChangeDate = (name, date) => {
    const existingDataIndex = inputDate.findIndex(data => data.name === name);
    if (existingDataIndex !== -1) {
      setInputDate(prevInputDate => prevInputDate.map((data, index) => index === existingDataIndex ? _objectSpread(_objectSpread({}, data), {}, {
        date
      }) : data));
    } else {
      setInputDate(prevInputDate => [...prevInputDate, {
        name,
        date
      }]);
    }
  };
  const renderModal = () => {
    const inputElements = [];
    for (const input in formStructure) {
      let theElement;
      if (Object.hasOwnProperty.call(formStructure, input)) {
        const type = formStructure[input];
        const metadata = input.toLowerCase().split(" ").join("_");
        const isRequired = type[0] === true;
        if (type[1] !== "select" && type[1] !== "date") {
          theElement = /*#__PURE__*/_react.default.createElement("div", {
            className: "input-wrapper",
            key: metadata,
            "data-name": input,
            "data-type": type[1]
          }, /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: metadata
          }, input), /*#__PURE__*/_react.default.createElement("input", {
            type: type[1],
            id: metadata,
            required: isRequired
          }));
        } else if (type[1] === "select") {
          theElement = renderSelectInput(input, type[2], metadata);
        } else if (type[1] === "date") {
          theElement = renderDateInput(input, metadata);
        }
      }
      inputElements.push(theElement);
    }
    return inputElements;
  };
  const renderSelectInput = (name, selection, metadata) => {
    const options = [];
    selection.forEach(e => {
      options.push({
        value: e.toLowerCase(),
        label: e
      });
    });
    const isRequired = formStructure[name][0];
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "input-wrapper",
      key: metadata,
      "data-name": name,
      "data-type": 'select'
    }, /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: metadata
    }, name), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      defaultValue: selectedOption,
      onChange: setSelectedOption,
      className: metadata,
      options: options,
      required: isRequired
    }));
  };
  const renderDateInput = (name, metadata) => {
    var _inputDate$find;
    const isRequired = formStructure[name][0];
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "input-wrapper",
      key: metadata,
      "data-name": name,
      "data-type": 'date'
    }, /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: metadata
    }, name), /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, {
      selected: ((_inputDate$find = inputDate.find(data => data.name === name)) === null || _inputDate$find === void 0 ? void 0 : _inputDate$find.date) || null,
      onChange: date => handleChangeDate(name, date),
      required: isRequired
    }));
  };
  return /*#__PURE__*/_react.default.createElement("section", {
    className: "modal"
  }, /*#__PURE__*/_react.default.createElement("form", {
    className: "form",
    id: "form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("h1", null, props.modalName), renderModal(), /*#__PURE__*/_react.default.createElement("button", {
    id: "submit",
    className: "save-button",
    type: "submit"
  }, props.submitButton)));
}