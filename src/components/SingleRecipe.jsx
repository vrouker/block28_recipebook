import { useState } from "react"
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom'

function SingleRecipe({singleRecipe, setSingleRecipe, favRecipes, setFavRecipes}){

const token = localStorage.getItem("token")

const navigate = useNavigate()

async function handleFav (){
    console.log(singleRecipe)
    try {
        const response = await fetch ("https://fsa-recipe.up.railway.app/api/favorites", {
            method: "POST",
            headers: {"Content-type": "application/json",
                Authorization: `Bearer ${token}`},
            body: JSON.stringify(
                {mealId: singleRecipe.idMeal,
                name: singleRecipe.strMeal,
                imageUrl: singleRecipe.strMealThumb,
                strArea: singleRecipe.strArea}
            )
        }
    )
        const result = await response.json();
        setFavRecipes(prevState => [...prevState,result.data])
        //allows you to keep the previous state and add onto the end of the state
        console.log(result.data)
    }
    catch (error){
        console.log(error)
    }
    navigate("/favorites")
}

//getting an error (4oo) Bad Request back from the API

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
                token ? <button onClick={handleFav} >Add to Favorites!</button> : null
            }
        </>
    )
}

//page does not keep the meal id and does not render when refreshed
export default SingleRecipe