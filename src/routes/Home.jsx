import Header from "../containers/Header";
import Banner from "../containers/Banner";
import Context from "../containers/Context";
import "../css/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Banner />
      <Context />
    </div>
  );
};

export default Home;
