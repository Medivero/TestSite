import MainPage from './components/pages/mainpage'
import './styles.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
