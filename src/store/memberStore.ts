import { create } from 'zustand';
import { TeamMemberType } from 'src/types/calendar';

type MemberState = {
  teamMember: TeamMemberType[];
};

type MemberAction = {
  setTeamMember: (teamMember: TeamMemberType[]) => void;
};

export const useMemberStore = create<MemberState & MemberAction>()((set) => ({
  teamMember: [],
  setTeamMember: (teamMember) => set(() => ({ teamMember: teamMember }))
}));
