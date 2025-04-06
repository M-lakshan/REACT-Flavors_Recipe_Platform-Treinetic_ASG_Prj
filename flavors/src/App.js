import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/general/Header';
import Footer from './components/general/Footer';
// import Login from './components/pages/Login';
// import Registration from './components/pages/Registration';
// import Profile from './components/pages/Profile';
// import Favorites from './components/pages/Favorites';
// import Recipes from './components/pages/Recipes';
// import Cooking from './components/pages/Cooking';
// import Publish from './components/pages/Publish';
// import Results from './components/pages/Results';
import Home from './components/pages/Home';
import logo from './assets/images/logo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   theme_set: false,
    //   previous_page: null
    // };
  }

  render() {
    return (
      <Router>
        <Header header_logo={logo} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipies" element={<Recipes />} />
            <Route path="/cooking/:id" element={<Cooking />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/results" element={<Results />} /> */}
          </Routes>
        </main>
        <Footer 
          footer_logo={logo} 
          website={"flavors.lk"}
        />
      </Router>
    );
  }
}

export default App;
