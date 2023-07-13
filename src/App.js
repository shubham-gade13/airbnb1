import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { UserContextprovider } from './components/context/UserContext';
import Account from './components/Signup/Account/Account';
import MyPlaces from './components/myplaces/MyPlaces';
import EditPlace from './components/myplaces/editPlace/EditPlace';
import AllPlaces from './components/allplaces/AllPlaces';
import View_Place from './components/View_Place/View_Place';
 
function App() {
  return (
    <UserContextprovider>

    <Router>
    
      <Routes>
      
      <Route path='/' element={<AllPlaces/>}/>
      <Route path='/' element={<Header/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/account" element={<Account/>} />
       <Route path="/account/booking" element={<Account/>} />
        <Route path="/account/places" element={<Account/>} />
        <Route path="/account/places/new" element={<Account/>} />
        <Route path="/account/places/new/:id" element={<EditPlace/>} />
        <Route path="/place/:id" element={<View_Place/>}/> 
       
            

      </Routes>

    </Router>

    </UserContextprovider>
  );
}

export default App;
