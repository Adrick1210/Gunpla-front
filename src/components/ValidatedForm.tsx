import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField, FormControl, FormHelperText } from "@mui/material";
import CustomDropdown from "./CustomDropdown";
import * as Yup from "yup";

const validatedSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is Required"),
  address: Yup.string().required("Address is Required"),
  zipCode: Yup.string().required("Zip Code is Required"),
  state: Yup.string().required("State is Required"),
});

const ValidatedForm: React.FC = () => {
  const [stateValue, setStatValue] = useState("");

  const initialValues = {
    name: "",
    email: "",
    address: "",
    zipCode: "",
    state: stateValue,
  };

  const handleSubmit = (values: {
    name: string;
    email: string;
    address: string;
    zipCode: string;
    state: string;
  }) => {
    console.log("Form Values:", values);
  };

  return (
    <div>
      <h3>Customer Information</h3>
      <Formik
        initialValues={initialValues}
        validatedSchema={validatedSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <FormControl margin="normal" sx={{ width: "450px" }}>
              <Field
                as={TextField}
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                error={!!errors.name && touched.name}
                helperText={<ErrorMessage name="name" />}
              />
            </FormControl>
            <FormControl margin="normal" sx={{ width: "450px" }}>
              <Field
                as={TextField}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                error={!!errors.email && touched.email}
                helperText={<ErrorMessage name="email" />}
              />
            </FormControl>
            <FormControl margin="normal" sx={{ width: "900px" }}>
              <Field
                as={TextField}
                id="address"
                name="address"
                label="Street Address"
                variant="outlined"
                error={!!errors.address && touched.address}
                helperText={<ErrorMessage name="address" />}
              />
            </FormControl>
            <FormControl margin="normal" sx={{ width: "200px" }}>
              <Field
                as={TextField}
                id="zipCode"
                name="zipCode"
                label="Zip Code"
                variant="outlined"
                error={!!errors.zipCode && touched.zipCode}
                helperText={<ErrorMessage name="zipCode" />}
              />
            </FormControl>
            <CustomDropdown
              value={stateValue}
              onChange={(value) => setStatValue(value)} 
              error={!!errors.state && touched.state}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ValidatedForm;
