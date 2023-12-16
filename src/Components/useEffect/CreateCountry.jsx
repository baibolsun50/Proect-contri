import React, {useState, useEffect} from 'react'
import axios from "axios"
import Post from './Post'
import "./Main.css"
import CreatePost from './CreatePost'

const API_URL = 'https://656df576bcc5618d3c244f13.mockapi.io/ap/v1/country'

function CreateCountry() {
    const [post, setPost] = useState([])

    const [isActive, setIsActive] =useState(false)

    const [country, setCountry] = useState({})

    const  [service, setService] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(API_URL)

                if(res.status === 200) {
                    setPost(res.data)
                    setService(false)
                }
            }catch (error) {
                console.log(error)
            }
        }

        getPost()
    }, [service])

    const handleGetId = async (id) => {
        setIsActive(true)

        try{
           const res = await axios.get(`${API_URL}/${id}`)
           if(res.status === 200) {
            setCountry(res.data)
           }
           console.log(res)
        }catch (error) {
            console.log(error)
        }
    }
  const handleUpdate = async () => {
    try{
        const res = await axios.put(`${API_URL}/${country.id}, country`)

        if(res.status === 200) {
        setIsActive(false)
        setService(true)
        alert("Seccess Update post")
        }
        console.log(res)
        
    }catch (error) {
        alert("Something wrong is server")
    }
  }

  const handleDelete = async (id) => {
    let check = window.confirm("сиз очурууну каалайсызбы???");

    alert(check)

    if(check) {
        try{
            const res = await axios.delete(`${API_URL}/${id}`)

            if(res.status === 200) {
                setService(true)
                alert(" Сиздин Product ийгилуктуу очурулду")
            }


            console.log(res)
       }catch (error) {
        alert("Error something wrong how to do solove")
       }
    }else{
        alert("Сиздин Product очурулгон жок");
    }

   
  }
    
  return (
    <div>
        <CreatePost cliced={setService}/>
        <div className='post'>
            {
                post.map((item) => (
                    <Post key={item.id}
                     data={item} 
                     update={handleGetId}
                     deletePost={handleDelete}
                     />
                ))
            }
        </div>
        {
         isActive && <div className='overlay'>
            <div className='popup-container'>
                <input 
                type="text" 
                placeholder='name'
                value={country.name}
                onChange={(e) => setCountry ({...country, name: e.
                    target.value})}
                />
                
                <input 
                type="url"
                 placeholder='Image url'
                 value={country.avatar}
                 onChange={(e) => setCountry ({...country, avatar: e.
                    target.value})}
                     />
                 
                <div className='btns'>
                    <button onClick={() => handleUpdate()}>Submit</button>
                    <button onClick={() => setIsActive(false)}>Colse
                    </button>
            </div>
         </div>
    </div>
        }
        
    </div>
  )
}

export default CreateCountry