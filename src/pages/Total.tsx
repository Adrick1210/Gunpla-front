import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Divider } from "@mui/material";
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

const Total = () => {
  const [confirmationNumber, setConfirmationNumber] = useState<string>("");
  const { resetCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const subPrice = location.state?.subPrice || 0;
  const taxes = 5.55;
  const shipping = 4.3;
  const cartTotal = subPrice + taxes + shipping;

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

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="checkout-container">
          <div className="user-info">
            <h3>Customer Information</h3>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              fullWidth
              id="zipCode"
              name="zipCode"
              label="Zip Code"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
            <TextField
              fullWidth
              id="state"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </div>
          <div className="card-info">
            <h3>Card Information</h3>
            <TextField
              fullWidth
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
            <TextField
              fullWidth
              id="expirationDate"
              name="expirationDate"
              label="Expiration"
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.expirationDate &&
                Boolean(formik.errors.expirationDate)
              }
              helperText={
                formik.touched.expirationDate && formik.errors.expirationDate
              }
            />
            <TextField
              fullWidth
              id="cvv"
              name="cvv"
              label="CVV"
              value={formik.values.cvv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
            />
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
              color="success"
              variant="contained"
              fullWidth
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

// import ValidatedForm from "../components/ValidatedForm";
// import CardForm from "../components/CardForm";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button, Divider } from "@mui/material";
// import { useContext, useState } from "react";
// import { ProductContext } from "../contexts/ProductContext";
// import { Formik } from "formik";

// function Total() {
//   const location = useLocation();
//   const subPrice = location.state?.subPrice || 0;
//   const taxes = 5.55;
//   const shipping = 4.3;
//   const cartTotal = subPrice + taxes + shipping;
//   const navigate = useNavigate();
//   const { resetCart } = useContext(ProductContext);
//   const [confirmationNumber, setConfirmationNumber] = useState<string>("");

//   const generateConfirmationNumber = (length: number) => {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     const charactersLength = characters.length;
//     let result = "";

//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     return result;
//   };

//   const handleCheckoutClick = () => {
//     const newConfirmationNumber = generateConfirmationNumber(12);
//     setConfirmationNumber(newConfirmationNumber);

//     resetCart();
//     navigate("/confirmation", {
//       state: { confirmationNumber: newConfirmationNumber },
//     });
//   };

//   return (
//     <Formik initialValues={{}} onSubmit={() => {}} validateOnMount={true}>
//       {(formik) => (
//         <div>
//           <h1>Checkout Page</h1>

//           <div className="user-info">
//             <ValidatedForm formik={formik} />
//           </div>
//           <div className="card-info">
//             <CardForm formik={formik} />
//           </div>
//           <Divider sx={{ marginTop: "20px" }} />
//           <h2>Today's Total</h2>
//           <div className="cart-total">
//             <div className="totals">
//               <div className="price">
//                 <h4>Cart Total: </h4>
//                 <p>${subPrice.toFixed(2)}</p>
//               </div>
//               <div className="price">
//                 <h4>Taxes:</h4>
//                 <p>${taxes.toFixed(2)}</p>
//               </div>
//               <div className="price">
//                 <h4>Shipping:</h4>
//                 <p>${shipping.toFixed(2)}</p>
//               </div>

//               <Divider />
//               <h2>Your Total: ${cartTotal.toFixed(2)}</h2>
//             </div>
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleCheckoutClick}
//               disabled={!formik.isValid}
//             >
//               Place Order
//             </Button>
//           </div>
//         </div>
//       )}
//     </Formik>
//   );
// }
// export default Total;
