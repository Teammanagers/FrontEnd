import { Route, Routes } from 'react-router-dom';
import { EndProject } from '@components/management/end-project/EndProject.tsx';
import { Comments } from '@components/management/end-project/Comments.tsx';
import { StopProject } from '@components/management/end-project/StopProject.tsx';

export const ExtraManagementPage = () => {
  return (
    <Routes>
      <Route path="end" element={<EndProject />} />
      <Route path="stop" element={<StopProject />} />
      <Route path="end/comment" element={<Comments />} />
    </Routes>
  );
};
