import { render } from '@testing-library/react'
import React, {useState, useEffect} from 'react'
import User from './User'
import "./Main.css"

const Url='https://reqres.in/api/users?page=2'

function Main() {
    const [user, setUser] = useState([])
    const [aboutUser, setAboutUser] = useState (null)


    useEffect(() => {
        fetch( Url)
        .then((response) => response.json())
        .then((x) => setUser(x.data))
    }, [])

    function getUserId (id) {
        console.log(id)
        fetch(`https://reqres.in/api/users/${id}`)
        .then((res) => res.json())
        .then((item) => setAboutUser(item.data))
    }

    console.log("App render")
    console.log(aboutUser)
    console.log(user)

    return (
     <div className='user'>
        {
            user.map((item) => (
                < User key={item.id} data={item} getUser={getUserId}/>
            ))
        }

        <div>
            
            <div className='about'>
                  <img src={aboutUser?.avatar} alt="image" />
            </div>
        </div>
    </div>
  )
}

export default Main