import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./components/Home"
import LogIn from"./components/LogIn"
import SignUp from "./components/SignIn"
import Favorites from "./components/Favorites"
import SingleRecipe from './components/SingleRecipe'


function App() {
  const [recipes, setRecipes] = useState([])
  
  
  useEffect(()=>{
    const getRecipes = async ()=>{
      const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes")
      const data = await res.json()
      setRecipes(data)
    }
    getRecipes();
  })


  return (
    <>
      <div id = "navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Log In!</Link>
        <Link to="/signup">Sign Up!</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home recipes={recipes} setRecipes={setRecipes}/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/singlerecipe" element={<SingleRecipe/>}/>
        </Routes>
      </div>
      
    </>
  )
}

export default App
