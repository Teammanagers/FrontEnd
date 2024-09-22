import { Routes, Route } from 'react-router-dom';
import { WriteMemo } from '@components/Memo/WriteMemo.tsx';
import { EditMemo } from '@components/Memo/EditMemo.tsx';

export const ExtraMemoPage = () => {
  return (
    <Routes>
      <Route path="write" element={<WriteMemo />} />
      <Route path="edit/:memoId" element={<EditMemo />} />
    </Routes>
  );
};
