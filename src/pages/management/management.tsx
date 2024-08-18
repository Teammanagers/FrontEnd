import styled from 'styled-components';
import { TeamCode } from '@components/management/team-code/TeamCode.tsx';
import { Members } from '@components/management/member/Members.tsx';
import { Schedule } from '@components/management/schedule/Schedule.tsx';
import { AddSchedule } from '@components/management/schedule/AddSchedule.tsx';
import { useEffect, useState } from 'react';
import { ShowSchedule } from '@components/management/schedule/ShowSchedule.tsx';
import { NoSchedule } from '@components/management/schedule/NoSchedule.tsx';
import { getTeamData } from '@apis/management-team.ts';
import { TeamData } from '../../types/team.ts';

export const ManagementPage = () => {
  const [showAddSchedule, setShowAddSchedule] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<number[]>([]); // 스케줄 조회, 현재는 임시

  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleAddSchedule = () => {
    setShowAddSchedule(true);
  };

  const handleScheduleSubmit = (isAdded: boolean) => {
    if (isAdded) {
      setIsSubmitted(true);
      setSchedules([...schedules]); // 스케줄 추가 로직... 나중에 수정..
    }
    setShowAddSchedule(false);
  };

  const fetchTeamData = async () => {
    const response = await getTeamData(1);
    setTeamData(response);
    console.log(response);

    const newTags = response.teamTagList?.map((tag) => tag.name) || [];
    setTags(newTags);
    console.log(typeof newTags);
    console.log(newTags);
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const refreshTeamData = async () => {
    await fetchTeamData();
  };

  return (
    <Container>
      <TeamCode
        imageUrl={teamData?.imageUrl}
        teamCode={teamData?.teamCode}
        title={teamData?.title}
        tagList={tags}
        refreshTeamData={refreshTeamData}
      />
      <Members />
      {!showAddSchedule ? (
        <>
          <Schedule
            onAddSchedule={handleAddSchedule}
            isSubmitted={isSubmitted}
          />
          {schedules.length > 0 ? <ShowSchedule /> : <NoSchedule />}
        </>
      ) : (
        <AddSchedule onSubmit={handleScheduleSubmit} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 182px;
`;
