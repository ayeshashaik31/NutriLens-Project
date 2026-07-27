import { Route, Routes } from "react-router-dom"
import Result from "./pages/Result"
import Home from "./pages/Home"
import Layout from "./components/Layout"



function App() {
  return (
    
    <Routes>
      <Route element= {<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/result" element={<Result/>}/>
      </Route>
    </Routes>
      
  
  )
}



export default App
