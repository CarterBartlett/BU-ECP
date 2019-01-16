export default [
  {
    name: "name",
    label: "Request Name",
    type: "text",
    validators: {
      required: true
    },
    size: 12
  },
  {
    name: "attached_form",
    label: "Upload Request Form",
    type: "file",
    placeholder: "Upload your Exceptional Circumstances form",
    validators: {
      required: true,
      allowedTypes: [".doc", ".docx", ".pdf", ".odf", ".rtf"]
    },
    size: 12
  },
  {
    name: "unit_leader",
    label: "Select your unit leader",
    type: "dropdown",
    default: "0",
    redux: "lecturer",
    options: [{ name: "Please select", value: null }],
    size: 12,
    validators: {
      required: true
    }
  }
];
