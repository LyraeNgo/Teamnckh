import { BrowserRouter,Routes,Route } from "react-router-dom"

// do not foget import pages
import Home from "./pages/Home/Home.jsx"
import MainPage from "./pages/MainPage/MainPage.jsx"
import About from "./pages/About/About.jsx"
import Contact from "./pages/Contact/Contact.jsx"

/* ********************************************* */ 
// import components (if needed)

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/MainPage" element={<MainPage/>}/>
          <Route path="/About" element={<About/>}/>

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App;
