

function SingleRecipe({singleRecipe, setSingleRecipe}){


    return(
        <>
            <h1>{singleRecipe.strMeal}</h1>
            <p>{singleRecipe.strArea}</p>
            <h2>Ingredients:</h2>
            <p>{singleRecipe.ingredients}</p>
            <h2>Cooking Instructions:</h2>
            <p>{singleRecipe.strInstructions}</p>
            <button>Link to How To video</button>
        </>
    )
}

//page does not keep the meal id and does not render when refreshed
export default SingleRecipe