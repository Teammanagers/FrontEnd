import { create } from 'zustand';

type IdStore = {
  ownerTeamManageId: number;
  leaderTeamManageId: number;
};

type SetIdAction = {
  setOwnerId: (ownerTeamManageId: number) => void;
  setLeaderId: (leaderTeamManageId: number) => void;
};

export const useIdStore = create<IdStore & SetIdAction>()((set) => ({
  ownerTeamManageId: 0,
  leaderTeamManageId: 0,
  setOwnerId: (ownerTeamManageId) =>
    set(() => ({ ownerTeamManageId: ownerTeamManageId })),
  setLeaderId: (leaderTeamManageId) =>
    set(() => ({ leaderTeamManageId: leaderTeamManageId }))
}));
