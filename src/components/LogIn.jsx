import {useState} from 'react'

function LogIn({setToken}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await fetch ("https://fsa-recipe.up.railway.app/api/auth/login",{
                method: "POST",
                headers:{"Content-type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const result = await res.json();
            console.log(result)
            setToken(result.token)
        }
        catch (error){
            console.error(error)
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    name="username"
                    onChange={(e)=>setUsername(e.target.value)}
                    value={username}
                    required
                />
            </label>
            <br/>
            <label>
                Password:
                <input
                    name = "password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            <br/>
            <button>Log In!</button>
        </form>
    )
}

export default LogIn
