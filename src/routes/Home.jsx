import Banner from "../containers/Banner"
import Context from "../containers/Context";
import "../css/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Banner />
      <Context />
    </div>
  );
};

export default Home;
