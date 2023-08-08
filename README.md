# react-personalized-form

A simple npm package for creating dynamic forms in your React App.

## Installation
Run the following command in your terminal:

```bash
npm install react-personalized-form

or

yarn add react-personalized-form
```

## Usage
```jsx
import { Form } from "react-personalized-form";

<Form 
    modalName={'People Form'} 
    input={{
    'First Name': [true,'text'],
    'Last Name': [true, 'text'],
    'Date of Birth': [true, 'date'],
    'City': [true, 'text'],
    'State': [true, 'select', statesName],
    'Zip Code': [true, 'number'],
    }}
    submitButton={'Save'}
    onSubmit={handleSubmitForm}
/>    
```

## Props Usage

 modalName:
   - The title of the form.

 input:
   - An object that defines the input fields in the form. The keys are the input names, and the values are arrays with the following structure:
     - [0]: Boolean indicating if the input is required (true or false).
     - [1]: Input type ('text', 'number', 'date', or 'select').
     - [2] (if input type is 'select'): Array of options for the select input.

 submitButton:
   - The text to display on the submit button.

 onSubmit:
   - A function that handles the form data when submitted.

## Styling

The package provides simple classes for styling:

- modal: To select the container of the form
- form: To select the form element.
- input-wrapper: To select the container of the label and input.
- save-button: To select the submit button.

## Contributors
Developed by eliaexe
