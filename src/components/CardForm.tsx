import { useState } from "react";
import { useFormik } from "formik";
import { TextField, Grid } from "@mui/material";
import * as Yup from "yup";

interface CardInformation {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

const validatedSchema = Yup.object().shape({
  cardNumber: Yup.string().required("Card number is required"),
  expirationDate: Yup.string().required("Expiration date is required"),
  cvv: Yup.string().required("CVV is required"),
});

const CardForm: React.FC = () => {
  const [placeholders, setPlaceholders] = useState({
    cardNumber: "0000-0000-0000-0000",
    expirationDate: "MM/YY",
    cvv: "000",
  });

  const formik = useFormik<CardInformation>({
    initialValues: {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
    validationSchema: validatedSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1-"); // Add dashes every 4 characters
    formik.setFieldValue("cardNumber", formattedValue);
    setPlaceholders((prevPlaceholders) => ({
      ...prevPlaceholders,
      cardNumber: formattedValue ? formattedValue : "0000-0000-0000-0000",
    }));
  };

  const handleExpirationDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(?=\d)/g, "$1/"); // Add slash every 2 characters
    formik.setFieldValue("expirationDate", formattedValue);
    setPlaceholders((prevPlaceholders) => ({
      ...prevPlaceholders,
      expirationDate: formattedValue ? formattedValue : "MM/YY",
    }));
  };

  const handleCVVInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/\D/g, "");
    formik.setFieldValue("cvv", formattedValue);
    setPlaceholders((prevPlaceholders) => ({
      ...prevPlaceholders,
      cvv: formattedValue ? formattedValue : "000",
    }));
  };

  return (
    <div>
      <h3>Card Information</h3>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ width: "650px" }}
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              variant="outlined"
              value={formik.values.cardNumber}
              onChange={handleCardNumberInput}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              placeholder={placeholders.cardNumber}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ width: "300px", marginLeft: "250px" }}
              id="expirationDate"
              name="expirationDate"
              label="Expiration Date"
              variant="outlined"
              value={formik.values.expirationDate}
              onChange={handleExpirationDateInput}
              error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
              helperText={formik.touched.expirationDate && formik.errors.expirationDate}
              placeholder={placeholders.expirationDate}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              sx={{ width: "100px", marginLeft: "250px" }}
              id="cvv"
              name="cvv"
              label="CVV"
              variant="outlined"
              value={formik.values.cvv}
              onChange={handleCVVInput}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
              placeholder={placeholders.cvv}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CardForm;
