import { Routes, Route } from 'react-router-dom';
import { WriteMemo } from '@components/memo/WriteMemo.tsx';

export const ExtraMemoPage = () => {
  return (
    <Routes>
      <Route path="write" element={<WriteMemo />} />
    </Routes>
  );
};
