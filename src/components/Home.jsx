import {useNavigate} from 'react-router-dom'

function Home({recipes, setRecipes, singleRecipe, setSingleRecipe}){
    const navigate = useNavigate()

    const handleClick = (recipe) =>{
        setSingleRecipe(recipe)
        navigate("/singlerecipe")
    }

    return(
        <>
            {
                recipes.map((recipe)=> <div key={recipe.idMeal}>
                    <img src={recipe.strMealThumb}/>
                    <h2>{recipe.strMeal}</h2>
                    <p>{recipe.strArea}</p>
                    <button onClick={()=>handleClick(recipe)}>See more details!</button>
                </div>)
            }
        </>
    )
}

export default Home