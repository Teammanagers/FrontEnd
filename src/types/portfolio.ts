export interface PortfolioResponse {
  code: number;
  message: string;
  result: {
    portfolioList: {
      teamId: number;
      name: string;
      start: string;
      end: string;
    }[];
  };
}

export interface DetailedPortfolio {
  code: number;
  message: string;
  result: {
    teamId: number;
    name: string;
    start: string;
    end: string;
    teamTagList: string[];
    teamMemberList: string[];
    teamMyRole: string[];
    storageList: {
      storageId: number;
      title: string;
      size: string;
      uploadAt: string;
      fileUrl: string;
      uploader: string;
    }[];
  };
}

// 내 팀 조회
export interface GetMemberTeamResponse {
  code: number;
  message: string;
  result: {
    name: string;
    teamList: Team[];
  };
}

interface Team {
  teamId: number;
  title: string;
  teamCode: string;
  imageUrl: string;
  teamTagList: TeamTag[];
}

interface TeamTag {
  tagId: number;
  name: string;
}
