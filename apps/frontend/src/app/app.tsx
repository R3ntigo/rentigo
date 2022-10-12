import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './product-upload-frontpage/test';
import Test2 from './product-upload-frontpage/test2';
console.log('test');
const App = () => (
  <>
    <p className="text-yellow-500 text-2xl font-extrabold">Welcome Frontend</p>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
);

export default App;
