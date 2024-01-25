import { useEffect,useState } from "react"
import { useAuth } from "../context/AuthContext"


function example() {
    const {users, getUsers} = useAuth()
    const [user, setUser] = useState(null)
    const [option, setOption] = useState('')

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        setUser(users[0])
    }, [users])

    useEffect(() => {

    }, [])

    const exampleFunction = (e) =>{
        console.log(e.target.value)
        setOption(e.target.value)
    }

    return (
        <div>
           
                {
                    users && users.map(user => {
                        return <p>{user.usu_nombre}</p>
                        
                    })
                }
            <form action="">

                <select name="" id=""
                    onChange={e => exampleFunction(e)}
                    value={option}
                >
                    {
                        users && users.map(user => {
                            return <option value={user.usu_id}>{user.usu_nombre}</option>
                            
                        })
                    }
                </select>

                <input type="text" name="" id="" placeholder="adasd"/>
            </form>

            
        </div>
    )
}

export default example