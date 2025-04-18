import { useState } from "react"


function Favorites({favRecipes, setFavRecipes}){

const retFavRecipes = localStorage.getItem("favRecipes")
const favRecipeArray = JSON.parse(retFavRecipes)


    return(
      <>
      {
        favRecipeArray.map((favRecipe)=>
            <div key={favRecipe.id}>
                <img src={favRecipe.image}/>
                <h2>{favRecipe.name}</h2>
                <p>{favRecipe.category}</p>
                <button>Remove from favorites</button>
            </div>
        )
      }

      </>
    )
}
//The key for the new array has to be unique. 
//Make sure to use the correct keys from the new array, not the ones from the original API
export default Favorites