import { create } from 'zustand';

type IdStore = {
  ownerTeamManageId: number;
  leaderTeamManageId: number;
  teamId: number;
};

type SetIdAction = {
  setOwnerId: (ownerTeamManageId: number) => void;
  setLeaderId: (leaderTeamManageId: number) => void;
  setTeamId: (teamId: number) => void;
};

export const useIdStore = create<IdStore & SetIdAction>()((set) => ({
  ownerTeamManageId: 0,
  leaderTeamManageId: 0,
  teamId: 0,
  setOwnerId: (ownerTeamManageId) =>
    set(() => ({ ownerTeamManageId: ownerTeamManageId })),
  setLeaderId: (leaderTeamManageId) =>
    set(() => ({ leaderTeamManageId: leaderTeamManageId })),
  setTeamId: (teamId) => set(() => ({ teamId: teamId }))
}));
