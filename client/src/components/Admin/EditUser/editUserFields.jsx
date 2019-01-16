/*

Entry Format:
{
  name: "fieldName",
  label: "Field Label",
  placeholder: "Placeholder Text",
  type: "inputType",
  validators: {
    required: true // Marks the field as required, does not allow null values
  }
}

Valid Types:
text
date (still need to implement)
dropdown (still need to implement)

*/

export default [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    type: "text",
    helperText: "Required",
    size: 6,
    validators: { required: true, minLength: 2, maxLength: 20 }
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
    helperText: "Required",
    size: 6,
    validators: { required: true, minLength: 2, maxLength: 20 }
  },
  /*{
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    validators: {}
  },*/
  {
    name: "universityEmail",
    label: "University Email Address",
    placeholder: "i1234567@bournemouth.ac.uk",
    type: "text",
    helperText: "Required",
    size: 6,
    validators: {
      required: true,
      isEmail: true
    }
  },
  {
    name: "personalEmail",
    label: "Personal Email Address",
    placeholder: "myemail@provider.com",
    type: "text",
    size: 6,
    validators: {
      isEmail: true
    }
  },
  {
    name: "username",
    label: "University Username",
    placeholder: "i1234567",
    type: "text",
    helperText: "Required",
    size: 6,
    validators: {
      required: true
    }
  },
  {
    name: "referenceNumber",
    label: "Reference Number",
    placeholder: "4123456",
    type: "text",
    helperText: "Required",
    size: 6,
    validators: {
    }
  },
  {
    name: "role",
    label: "Role",
    type: "dropdown",
    options: [
      { name: "Choose a role", disabled: true },
      { name: "Student", value: "student" },
      { name: "Lecturer", value: "lecturer" },
    ],
    size: 12,
    validators: {
      required: true
    }
  }
];
