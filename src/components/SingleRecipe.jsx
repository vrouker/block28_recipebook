import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function SingleRecipe({singleRecipe, setSingleRecipe, favRecipes, setFavRecipes}){

const token = localStorage.getItem("token")

const handleFav = ()=>{
    setFavRecipes([
        ...favRecipes,
        {
            id: singleRecipe.idMeal,
            image: singleRecipe.strMealThumb,
            name: singleRecipe.strMeal,
            category: singleRecipe.strCategory,
        }
    ])
    console.log(favRecipes)
    }

    const favRecipeStrings = JSON.stringify(favRecipes)
    const storedFavRecipes = localStorage.setItem("favRecipes", favRecipeStrings)



    return(
        <>
            <h1>{singleRecipe.strMeal}</h1>
            <img src={singleRecipe.strMealThumb}/>
            <p>{singleRecipe.strArea}</p>
            <h2>Ingredients:</h2>
            <p>{singleRecipe.ingredients}</p>
            <h2>Cooking Instructions:</h2>
            <p>{singleRecipe.strInstructions}</p>
            <button>Link to How To video</button>
            {
                token ? <button onClick={handleFav}>Add to Favorites!</button> : null
            }
        </>
    )
}

//page does not keep the meal id and does not render when refreshed
export default SingleRecipe