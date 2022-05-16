import { BrowserRouter, Route, Routes, } from 'react-router-dom';

import { Result, Step1, Step2, Step3 } from '../steps';


export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step-2" element={<Step2 />} />
        <Route path="/step-3" element={<Step3 />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
