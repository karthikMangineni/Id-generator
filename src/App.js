import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IdCard from './pages/IdCard/IdCard'
import Template from './pages/template/Template'
import InputCsv from './pages/inputCsvFile/InputCsv'
import ImageDirectoryInput from './pages/imageDirectory/ImageDirectoryInput'
import PreviewPage from './pages/Preview/PreviewPage'


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Template/>}></Route>
            <Route path='/idCard' element={<IdCard/>}/>
            <Route path="/inputPage" element={<InputCsv/>}></Route>
            <Route path="/ImageDirectory" element={<ImageDirectoryInput/>}/>
            <Route path="/previewPage" element={<PreviewPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
