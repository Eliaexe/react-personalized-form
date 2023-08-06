    # React personalized form

    Make your form direcly whit a React component!

    ```javascript React
    <Form 
    modalName={'Create Employee'} 
    input={{
        'First Name': [true,'text'],
        'Last Name': [true, 'text'],
        'Date of Birth': [true, 'date'],
        'Start Date': [true, 'date'],
        'Street': [true, 'text'],
        'City': [true, 'text'],
        'State': [true, 'select', statesName],
        'Zip Code': [true, 'number'],
        'Department': [true, 'select', department],
    }}
    submitButton={'Save'}
    onSubmit={handleSubmitForm}
    />

    In the input you need to give:
        'The input name': ['is required?', 'type of input', 'list of options for select']

    We need the list of option only for select input!! The list must be an array!! 
