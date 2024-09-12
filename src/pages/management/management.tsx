import styled from 'styled-components';
import { TeamCode } from '@components/Management/team-code/TeamCode.tsx';
import { Members } from '@components/Management/member/Members.tsx';
import { Schedule } from '@components/Management/schedule/Schedule.tsx';
import { AddSchedule } from '@components/Management/schedule/AddSchedule.tsx';
import { useEffect, useState } from 'react';
import { ShowSchedule } from '@components/Management/schedule/ShowSchedule.tsx';
import { NoSchedule } from '@components/Management/schedule/NoSchedule.tsx';
import { getMySchedules, getSchedules, getTeamData } from '@apis/management.ts';
import { ScheduleDto, TeamData, TeamTag } from '../../types/management.ts';
import { useIdStore } from '@store/idStore.ts';

export const ManagementPage = () => {
  const [showAddSchedule, setShowAddSchedule] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<ScheduleDto | null>(null);
  const [mySchedules, setMySchedules] = useState<ScheduleDto | null>(null);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);

  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [tags, setTags] = useState<TeamTag[]>([]);

  const { teamId, setTeamId } = useIdStore((state) => ({
    teamId: state.teamId,
    setTeamId: state.setTeamId
  }));
  const getTeamId = () => {
    const id = localStorage.getItem('teamId');
    setTeamId(Number(id));
  };

  useEffect(() => {
    getTeamId();
    console.log(teamId);
  }, [teamId]);

  const handleAddSchedule = () => {
    setShowAddSchedule(true);
  };

  const handleScheduleSubmit = async (newSchedule: ScheduleDto | null) => {
    if (newSchedule) {
      setSchedules(newSchedule); // 스케줄 추가로직 수정, 나중에 더 필요할 수도 있음
    } else {
      setSchedules(null);
    }
    setShowAddSchedule(false);
    await refreshTeamData(); // 스케줄 제출 후 데이터 갱신
  };

  const fetchTeamData = async () => {
    const response = await getTeamData(teamId);
    setTeamData(response);
    const newTags = response.teamTagList || [];
    setTags(newTags);
  };

  // 팀 스케줄 조회
  const fetchSchedules = async () => {
    const response = await getSchedules(teamId);
    setSchedules(response.scheduleDto);
    setIsScheduled(response.isScheduled);
  };

  // 내 스케줄 조회
  const fetchMySchedules = async () => {
    const response = await getMySchedules(teamId);
    console.log('내스케줄 패치:', response);
    setMySchedules(response);
  };

  const refreshTeamData = async () => {
    await fetchTeamData();
    await fetchSchedules();
    await fetchMySchedules();
  };

  const handleTeamNameChange = (newName: string) => {
    if (teamData) {
      setTeamData((prevData) => ({ ...prevData, title: newName }));
    }
  };

  const fetchData = async () => {
    if (teamId) {
      await fetchTeamData();
      await fetchSchedules();
      await fetchMySchedules();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(teamId);

  return (
    <Container>
      <TeamCode
        imageUrl={teamData?.imageUrl}
        teamCode={teamData?.teamCode}
        title={teamData?.title || ''}
        tagList={tags}
        onTeamNameChange={handleTeamNameChange}
        refreshTeamData={refreshTeamData}
        teamId={teamId}
      />
      <Members teamId={teamId} />
      {!showAddSchedule ? (
        <>
          <Schedule
            onAddSchedule={handleAddSchedule}
            isScheduled={isScheduled}
            teamId={teamId}
          />
          {schedules && Object.keys(schedules).length > 0 ? (
            <ShowSchedule schedule={schedules} />
          ) : (
            <NoSchedule />
          )}
        </>
      ) : (
        <AddSchedule
          onSubmit={handleScheduleSubmit}
          initialSchedules={mySchedules && mySchedules}
          isScheduled={isScheduled}
          teamId={teamId}
        />
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
