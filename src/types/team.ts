export interface CreateTeamInput {
  title: string;
  teamTagList: string[];
  imageFile: File;
}

export interface CreateTeamResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    teamId: number;
    teamCode: string;
  };
}

export interface UpdateTeamPasswordInput {
  teamId: number;
  password: string;
}

export interface TeamTagList {
  tagId: number;
  name: string;
}

export interface TeamInfo {
  team: {
    imageUrl: string;
    teamCode: string;
    teamId: number;
    teamTagList: TeamTagList[];
    title: string;
  };
}

export interface GetTeamResponse {
  result: TeamInfo;
  data: {
    result: {
      team: TeamInfo;
    };
  };
}
