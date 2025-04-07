import './styles/App.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/general/Header';
import Footer from './components/general/Footer';
import Login from './components/pages/Login';
import Registration from './components/pages/Registration';
import Profile from './components/pages/Profile';
import Favorites from './components/pages/Favorites';
import Recipes from './components/pages/Recipes';
import Cooking from './components/pages/Cooking';
import Publish from './components/pages/Publish';
import Results from './components/pages/Results';
import Home from './components/pages/Home';
import logo from './assets/images/logo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { theme_val, user_val, favorites_val, ongoing_recipe } = this.props;

    return (
      <Router>
        <Header 
          header_logo={logo} 
          cur_theme={theme_val}
          cur_user={user_val}
        />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<Home cur_theme={theme_val} />}
            />
            <Route 
              path="/login" 
              element={<Login cur_theme={theme_val} />}
            />
            <Route 
              path="/registration" 
              element={<Registration cur_theme={theme_val} />}
            />
            <Route 
              path="/profile" 
              element={<Profile 
                cur_theme={theme_val} 
                cur_user={user_val}
              />}
            />
            <Route 
              path="/favorites" 
              element={<Favorites 
                cur_theme={theme_val} 
                cur_user={user_val}
                cur_favs={favorites_val}
              />}
            />
            <Route 
              path="/recipies" 
              element={<Recipes 
                cur_theme={theme_val} 
                cur_favs={favorites_val}
              />}
            />
            <Route 
              path="/cooking/:id" 
              element={<Cooking 
                cur_theme={theme_val} 
                cur_user={user_val}
                cur_recipe={ongoing_recipe}
              />}
            />
            <Route 
              path="/publish" 
              element={<Publish 
                cur_theme={theme_val} 
                cur_user={user_val} 
              />}
            />
            <Route 
              path="/results" 
              element={<Results cur_theme={theme_val} />}
            />
          </Routes>
        </main>
        <Footer 
          footer_logo={logo} 
          year={2025}
          website={"flavors.lk"}
          cur_theme={theme_val}
        />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  theme_val: state.cur_theme.theme,
  user_val: state.cur_user.user,
  favorites_val: state.cur_user.favorites,
  ongoing_recipe: state.cur_cooking.ongoingRecipe
});

export default connect(mapStateToProps)(App);