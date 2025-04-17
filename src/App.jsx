import { useState, useEffect, useInsertionEffect } from 'react'
import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./components/Home"
import LogIn from"./components/LogIn"
import SignUp from "./components/SignIn"
import Favorites from "./components/Favorites"
import SingleRecipe from './components/SingleRecipe'


function App() {
  const [recipes, setRecipes] = useState([])
  const [singleRecipe, setSingleRecipe] = useState()
  const [token, setToken] = useState()
  const [favRecipes, setFavRecipes] = useState ([])
  
  //Generate a list of recipes from the API on the home page
  useEffect(()=>{
    const getRecipes = async ()=>{
      const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes")
      const data = await res.json()
      setRecipes(data)
    }
    getRecipes();

    const storedToken = localStorage.getItem("token")

    if (storedToken){
      setToken({token:storedToken})
    }
  }, [])

  useEffect(()=>{
    if (token){
      localStorage.setItem("token", token)
    }
  })

  const handleSignOut =()=>{
    setToken("")
    localStorage.clear(token)
  }

  return (
    <>
      <div id = "navbar">
        {
          token ? 
          <div>
          <Link to="/">Home</Link>
          <Link to="/login">Log In!</Link>
          <Link to="/favorites">Favorites</Link>
          <button onClick={handleSignOut}>Sign Out</button>
          </div>
           :  
          <div>
          <Link to="/">Home</Link>
          <Link to="/login">Log In!</Link>
          <Link to="/signup">Sign Up!</Link>
          </div>
        }
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home recipes={recipes} setRecipes={setRecipes} singleRecipe={singleRecipe} setSingleRecipe={setSingleRecipe}/>}/>

          <Route path="/login" element={<LogIn token={token} setToken={setToken}/>}/>

          <Route path="/signup" element={<SignUp setToken={setToken} token={token}/>}/>

          <Route path="/favorites" element={<Favorites favRecipes={favRecipes} setFavRecipes={setFavRecipes}/>}/>

          <Route path="/singlerecipe" element={<SingleRecipe recipes={recipes} setRecipes={setRecipes} singleRecipe={singleRecipe} setSingleRecipe={setSingleRecipe} favRecipes={favRecipes} setFavRecipes={setFavRecipes}/>}/>
          
        </Routes>
      </div>
      
    </>
  )
}

export default App
