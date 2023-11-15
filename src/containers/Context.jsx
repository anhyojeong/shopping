import Category from "../components/Category";
import Products from "../components/Products";
import "../css/context.css"

const Context = () => {
  return (
    <div className="context-container">
        <Category />
        <Products />
    </div>
  );
};

export default Context;
