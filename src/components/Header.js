import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="title">
      <Link className="logo" to="/">
        Weave;IT!
      </Link>
      <div className="tab">
        <Link to="/Howto">Howto</Link>
        <Link to="/app">Start Weaving</Link>
      </div>
    </div>
  );
}
export default Header;
