import {Box, useColorModeValue,} from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom";

//routes
import CreatePage from "./pages/createPage";
import Navbar from "./components/navbar";
import HomPage from "./pages/HomPage";
import SensorDisplay from "./pages/SensorDisplay";
import Motion from './pages/Motion';




function App() {
  return (
    <>
    <Box minH={'100vh'} bg={useColorModeValue("gray.100", "gray.900")}>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomPage/>}></Route>
      <Route path="/create" element={<CreatePage/>}></Route>
      <Route path="/display" element={<SensorDisplay/>}></Route>
      <Route path="/motion" element={<Motion/>}></Route>
    </Routes>
    </Box>
    </>
  )
}

export default App
