import { useState, useEffect } from "react"


const token = localStorage.getItem("token");


function Favorites({favRecipes, setFavRecipes}){
    const [refresh, setRefresh] = useState(false)

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
      }, [refresh])
    
    async function handleDelete (id) {
        try {
            const response = await fetch (`https://fsa-recipe.up.railway.app/api/favorites/${id}`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("deleted")
            setRefresh(!refresh)
            //!refresh triggers the getFavRecipes to rerender 
        } catch (error){
            console.log(error)
        }
    }

    return(
      <>
      <h1>Favorites!</h1>
        <>
        {favRecipes && favRecipes.map((favRecipe)=> 
        //if favRecipes is truthy, run the map
        <div key={favRecipe.id}>
        <img src={favRecipe.strMealThumb}/>
        <h2>{favRecipe.strMeal}</h2>
        <p>{favRecipe.strArea}</p>
                <button onClick = {()=>handleDelete(favRecipe.id)}>Remove from favorites</button>
        </div>
        )
      }
        </>

      </>
    )
}

export default Favorites