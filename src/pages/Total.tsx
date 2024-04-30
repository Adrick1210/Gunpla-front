import ValidatedForm from "../components/ValidatedForm";
import CardForm from "../components/CardForm";

function Total() {
  
  return (
    <div>
      <h1>Checkout Page</h1>
      <div className="user-info">
        <ValidatedForm />
      </div>
      <div className="card-info">
        <CardForm />
      </div>
    </div>
  );
}
export default Total;
