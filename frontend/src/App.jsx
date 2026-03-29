import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "./components/ui/button"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Index from './page/Index'
import Signup from './page/Signup'
import Signin from './page/Signin'
import Profile from './page/profile'
import AddCategory from './page/category/AddCategory'
import ListCategory from './page/category/ListCategory'
import EditCategory from './page/category/EditCategory'
import AddBlog from './page/blog/AddBlog'
import BlogDetails from './page/blog/BlogDetails'
import BlogEdit from './page/blog/BlogEdit'
import Blogpage from './page/Blogpage'
import BlogByCategory from './page/BlogByCategory'
import SearchResult from './page/SearchResult'
import Comments from './page/category/Comments'
import User from './page/User'
import ProtectedLayout from './components/ui/ProtectedLayout'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Index />} />
          <Route path='/profile' element={<Profile />} />

          {/* Category Blog */}

          {/* Blog */}
          <Route path='/blog/:category/:blog' element={<Blogpage />} />
          <Route path='/blog-category/:category' element={<BlogByCategory />} />
          <Route path='/search' element={<SearchResult />} />

          <Route element={<ProtectedLayout />}>
            <Route path='/blog/add' element={<AddBlog />} />
            <Route path='/blogdetail' element={<BlogDetails />} />
            <Route path='/blog/edit/:blog_id' element={<BlogEdit />} />
            <Route path='/comments' element={<Comments />} />
            <Route path='/category/add' element={<AddCategory />} />
            <Route path='/categories' element={<ListCategory />} />
            <Route path='/category/edit/:category_id' element={<EditCategory />} />
            <Route path='/users' element={<User />} />


          </Route>
        </Route>

        <Route path='/sign-up' element={<Signup />} />
        <Route path='/sign-in' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
