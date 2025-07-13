import "./App.css";
import { Routes, Route } from "react-router-dom"
import {Home} from "./pages/Home"
import emailjs from '@emailjs/browser';
 // from Step 4


export default function App() {

  emailjs.init('-babpC7AqHUik9-yF');
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

