import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import UsersComponent from "./components/users/users.component";
import UserDetails from "./components/users/users.details";
import Profile from "./components/users/profile";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={UsersComponent} />
          <Route path="/user/add" component={SignUp} />
          <Route path="/my_profile" component={Profile} />
          <Route path="/editUser/:id" component={UserDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
