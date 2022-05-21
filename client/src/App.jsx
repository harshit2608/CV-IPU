import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/Profile";


const App = () => {
  // const user = useSelector((state) => state.user.currentUser);
  const user = false;
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element = {user ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element = {user ? <Navigate to="/" /> : <Register />}/>
        <Route path="product" element={<Product/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="addProduct" element={<AddProduct/>}/>
      </Routes>
  </Router>
  );
};

export default App;