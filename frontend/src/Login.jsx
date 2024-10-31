import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'


function App() {
  const [userName,setUserName] = useState("Hello")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  let navigate = useNavigate()

  function handleSubmit(event){
    event.preventDefault()
    fetch("http://localhost:3000/login",{
    method: "POST",
    headers:{
      "Content-Type": "application/json"

    },
    body: JSON.stringify({userName,password})
    })
    .then(response =>{
      if(!response.ok){
        setError("Invalid password or username")
        throw new Error("Network response was not ok")
        
      }
        return response.text()
      .then(data =>{
        console.log("Success", data)
        alert("Data sent Succesfully")
        navigate("/home")

      })
      .catch(error =>{
        alert("Error:", error)
        setError("Invalid password or username")
      })
    } )
  }
  
  function changeUsername(event){
    setUserName(event.target.value)
  }

  function changePassword(event){
    setPassword(event.target.value)
  }

  function navigateToRegister(event){
    event.preventDefault()
    navigate("/Register")
  }

  return (
    <>
    <div className='h-screen justify-center items-center flex overflow-hidden flex-col relative'>
      <form onSubmit={handleSubmit} className='h-[50%] w-[90%] md:w-[50%] border-solid border-2 border-red-900 
                                               justify-center items-center flex flex-col relative bg-yellow-600 font-mono'>
        <h1 className='absolute top-0 transform -translate-y-20 relative text-3xl text-red-900 font-bold'>Potato Login</h1>
        <label>Username:<input value={userName} onChange={changeUsername} className='border-2 p-1 m-5 mt-0'></input></label>
        <label>Password:<input value={password} onChange={changePassword} className='border-2 p-1 m-3'></input></label>
        <button type='submit' className='border-2 bg-red-900 absolute right-5 bottom-5 text-xl p-2'>Login</button>
        <button className='border-2 bg-red-900 absolute left-5 bottom-5 tex t-xl p-2' onClick={navigateToRegister}>Register</button>
        <p className='font-bold text-amber-900'>{error}</p>
      </form>
    </div>
    </>
  )
}

export default App
