import { useFormik } from "formik";
import { TextField, Grid, Typography } from "@mui/material";
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

  return (
    <div>
      <h3>Card Information</h3>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{width: "650px"}}
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              variant="outlined"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{width: "300px", marginLeft: "250px"}}
              id="expirationDate"
              name="expirationDate"
              label="Expiration Date"
              variant="outlined"
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
              error={
                formik.touched.expirationDate &&
                Boolean(formik.errors.expirationDate)
              }
              helperText={
                formik.touched.expirationDate && formik.errors.expirationDate
              }
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              sx={{width: "100px", marginLeft: "250px"}}
              id="cvv"
              name="cvv"
              label="CVV"
              variant="outlined"
              value={formik.values.cvv}
              onChange={formik.handleChange}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CardForm;
