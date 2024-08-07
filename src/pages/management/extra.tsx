import { Route, Routes } from 'react-router-dom';
import { EndProject } from '@components/management/EndProject.tsx';
import { Comments } from '@components/management/Comments.tsx';

export const ExtraManagementPage = () => {
  return (
    <Routes>
      <Route path="end" element={<EndProject />} />
      <Route path="end/comment" element={<Comments />} />
    </Routes>
  );
};
