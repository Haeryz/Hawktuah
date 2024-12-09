import {Box,} from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom";

//routes
import CreatePage from "./pages/createPage";
import Navbar from "./components/navbar";
import HomPage from "./pages/HomPage";




function App() {

  return (
    <>
    <Box minH={'100vh'} >
    <Navbar />
    <Routes>
      <Route path="/" element={<HomPage/>}></Route>
      <Route path="/create" element={<CreatePage/>}></Route>
    </Routes>
    </Box>
    </>
  )
}

export default App
