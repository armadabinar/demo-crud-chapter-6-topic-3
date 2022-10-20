import React, { useEffect, useState } from "react";


function UsersList() {

    const [users, setUsers] = useState([])
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])


    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const resp = await fetch('https://reqres.in/api/users', { method: 'GET' })
            const users = await resp.json()

            setUsers(users.data)
        } catch (err) {
            console.log(err)
        }
    }


    const deleteUser = async (id) => {
        try {
            const resp = await fetch(`https://reqres.in/api/users/${id}`, { method: 'DELETE' })

            if (resp.status > 299 || resp.status < 200) {
                throw new Error('not 200 delete')
            }


            alert('delete success')

            setUsers(users.filter(u => u.id !== id))
            fetchUsers()
        } catch (err) {
            console.log(err)
        }
    }

    const createUser = async () => {
        try {
            const resp = await fetch(`https://reqres.in/api/users`, {
                method: 'POST', body: JSON.stringify({
                    first_name: name,
                    last_name: name,
                    email
                })
            })

            if (resp.status > 299 || resp.status < 200) {
                throw new Error('not 200 delete')
            }


            alert('post success')

            // setUsers(users.filter(u => u.id !== id))
            fetchUsers()
        } catch (err) {
            console.log(err)
        }
    }


    const editUser = async (id) => {
        try {
            const resp = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'PUT', body: JSON.stringify({
                    first_name: name,
                    last_name: name,
                    email
                })
            })

            if (resp.status > 299 || resp.status < 200) {
                throw new Error('not 200 delete')
            }


            alert('put success')

            // setUsers(users.filter(u => u.id !== id))
            fetchUsers()
        } catch (err) {
            console.log(err)
        }
    }



    return (<div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="nama" />
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <button onClick={() => createUser()}>CREATE USER</button>
        {users.map(u => (<div>

            <img src={u.avatar} />
            <h4>{u.first_name}</h4>
            <button onClick={() => deleteUser(u.id)}>DELETE</button>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="nama" />
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
            <button onClick={() => editUser(u.id)}>EDIT USER</button>
        </div>))}

    </div>)
}


export default UsersList