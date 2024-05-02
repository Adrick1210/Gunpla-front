import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Divider, Paper, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is Required"),
  address: Yup.string().required("Address is Required"),
  zipCode: Yup.string().required("Zip Code is Required"),
  state: Yup.string().required("State is Required"),
  cardNumber: Yup.string().required("Card number is required"),
  expirationDate: Yup.string().required("Expiration date is required"),
  cvv: Yup.string().required("CVV is required"),
});

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const Total = () => {
  const [confirmationNumber, setConfirmationNumber] = useState<string>("");
  const { resetCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const subPrice = location.state?.subPrice || 0;
  const taxes = 5.55;
  const shipping = 4.3;
  const cartTotal = subPrice + taxes + shipping;
  const [placeholders, setPlaceholders] = useState({
    cardNumber: "0000-0000-0000-0000",
    expirationDate: "MM/YY",
    cvv: "000",
  });

  const handleCheckoutClick = (values: any) => {
    const newConfirmationNumber = generateConfirmationNumber(12);
    setConfirmationNumber(newConfirmationNumber);
    console.log(values);
    resetCart();
    navigate("/confirmation", {
      state: { confirmationNumber: newConfirmationNumber },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      zipCode: "",
      state: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCheckoutClick(values);
    },
  });

  const generateConfirmationNumber = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (inputValue.length <= 16) {
      const formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, "$1-"); // Add dashes every 4 characters
      formik.setFieldValue("cardNumber", formattedValue);
      setPlaceholders((prevPlaceholders) => ({
        ...prevPlaceholders,
        cardNumber: formattedValue ? formattedValue : "0000-0000-0000-0000",
      }));
    }
  };

  const handleExpirationDateInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (inputValue.length <= 4) {
      // Limit to 4 characters (MM/YY format)
      const formattedValue = inputValue.replace(/(\d{2})(?=\d)/g, "$1/"); // Add slash every 2 characters
      formik.setFieldValue("expirationDate", formattedValue);
      setPlaceholders((prevPlaceholders) => ({
        ...prevPlaceholders,
        expirationDate: formattedValue ? formattedValue : "MM/YY",
      }));
    }
  };

  const handleCVVInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (inputValue.length <= 3) {
      // Limit to 3 digits
      formik.setFieldValue("cvv", inputValue);
      setPlaceholders((prevPlaceholders) => ({
        ...prevPlaceholders,
        cvv: inputValue ? inputValue : "000",
      }));
    }
  };

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="checkout-container">
          <div className="user-info">
            <h3>Customer Information</h3>
            <div className="word-input">
              <Paper elevation={3} className="form-paper">
                <TextField
                  sx={{ width: "500px" }}
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Paper>
              <Paper elevation={3} className="form-paper">
                <TextField
                  sx={{ width: "500px" }}
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Paper>
              <Paper elevation={3} className="form-paper">
                <TextField
                  sx={{ width: "500px" }}
                  id="address"
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Paper>
            </div>
            <div className="number-input">
              <Paper elevation={3} className="form-paper">
                <TextField
                  sx={{ width: "200px" }}
                  id="zipCode"
                  name="zipCode"
                  label="Zip Code"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.zipCode && Boolean(formik.errors.zipCode)
                  }
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Paper>
              <Paper elevation={3} className="form-paper">
                <TextField
                  sx={{ width: "100px" }}
                  id="state"
                  name="state"
                  label="State"
                  select
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Paper>
            </div>
          </div>
          <div className="card-info">
            <h3>Card Information</h3>
            <div className="number">
              <Paper elevation={3} className="form-paper">
                <TextField
                  sx={{ width: "500px" }}
                  id="cardNumber"
                  name="cardNumber"
                  label="Card Number"
                  value={formik.values.cardNumber}
                  onChange={handleCardNumberInput}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardNumber &&
                    Boolean(formik.errors.cardNumber)
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                  placeholder={placeholders.cardNumber}
                />
              </Paper>
            </div>
            <div className="card-numbers">
              <Paper elevation={3} className="form-paper">
                <TextField
                  fullWidth
                  id="expirationDate"
                  name="expirationDate"
                  label="Expiration"
                  value={formik.values.expirationDate}
                  onChange={handleExpirationDateInput}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.expirationDate &&
                    Boolean(formik.errors.expirationDate)
                  }
                  helperText={
                    formik.touched.expirationDate &&
                    formik.errors.expirationDate
                  }
                  placeholder={placeholders.expirationDate}
                />
              </Paper>
              <Paper elevation={3} className="form-paper">
                <TextField
                  fullWidth
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  value={formik.values.cvv}
                  onChange={handleCVVInput}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                  helperText={formik.touched.cvv && formik.errors.cvv}
                  placeholder={placeholders.cvv}
                />
              </Paper>
            </div>
          </div>
        </div>
        <div className="cart-total">
          <div className="totals">
            <h2>Order Summary</h2>
            <div className="price">
              <h4>Cart Total: </h4>
              <p>${subPrice.toFixed(2)}</p>
            </div>
            <div className="price">
              <h4>Taxes:</h4>
              <p>${taxes.toFixed(2)}</p>
            </div>
            <div className="price">
              <h4>Shipping:</h4>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <Divider />
            <div className="price">
              <h2>Your Total: </h2>
              <h4>${cartTotal.toFixed(2)}</h4>
            </div>
          </div>
          <div className="button">
            <Button
              sx={{ width: "75%", marginBottom: "20px" }}
              color="success"
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
            >
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Total;
