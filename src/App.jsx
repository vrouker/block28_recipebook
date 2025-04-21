import { useState, useEffect} from 'react'
import './App.css'
import {Routes, Route, Link, data} from 'react-router-dom'
import Home from "./components/Home"
import LogIn from"./components/LogIn"
import SignUp from "./components/SignIn"
import Favorites from "./components/Favorites"
import SingleRecipe from './components/SingleRecipe'


function App() {
  const [recipes, setRecipes] = useState([])
  const [singleRecipe, setSingleRecipe] = useState({})
  const [token, setToken] = useState("")
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
      setToken(storedToken)
      //setToken is a string, if you set it to an object, everything breaks KEEP IT A STRING
    }

  }, [])

  useEffect(()=>{
    if (token){
      localStorage.setItem("token", token)
    }
  }, [token])

    useEffect(()=>{
      const getFavRecipes = async () => {
        const response = await fetch ("https://fsa-recipe.up.railway.app/api/favorites", {
          headers: {Authorization: `Bearer ${token}`}
        })
        const result = await response.json()
        setFavRecipes(result.data)
        console.log(result)
      }
      getFavRecipes();
    }, [token])


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
