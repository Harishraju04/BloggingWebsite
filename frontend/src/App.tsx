import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { UpdateProfile } from './pages/UpdateProfile'
import { Profile } from './pages/Profile'
function App() {
 

  return (
    <>
    
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path="/blog/:id" element={<Blog></Blog>}></Route>
        <Route path="/blog" element={<Blogs></Blogs>}></Route>
        <Route path="/publish" element={<Publish></Publish>}></Route>
        <Route path="/updateprofile" element={<UpdateProfile></UpdateProfile>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
