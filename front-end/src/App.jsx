import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Books from './pages/Books';
import Edit from './pages/Edit';
import Home from './pages/Home';
import NewBook from './pages/NewBook';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/books' element={<Books />}/>
        <Route path="/edit/:id" element={<Edit />}/>
        <Route path="/newbook" element={<NewBook />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
