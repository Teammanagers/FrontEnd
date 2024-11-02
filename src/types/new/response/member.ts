import {
  IComment,
  IMyTodoList,
  ISimplePortfolio,
  IStorage,
  ITag,
  ITeam,
  SocialType
} from '@/types/new/common';

export interface getMyProfileResponse {
  imageUrl: string; // 프로필 이미지
  name: string; // 이름 (NN)
  phoneNumber: string; // 폰 번호
  belong: string; // 소속
  loginProcess: SocialType; // 현재 로그인
  confidentRole: ITag[]; // 자신있는 역할
  commentList: IComment[]; // 팀원들의 한마디
}

export interface getMyTodoListResponse {
  myTodoList: IMyTodoList[];
}

export interface getMyPortfolioResponse {
  portfolioList: ISimplePortfolio[];
}

export interface getMyPortfolioDetailResponse {
  teamId: number; // Team ID
  name: string; // 프로젝트 이름
  start: Date; // 프로젝트 개설 일자
  end: Date; // 프로젝트 종료 일자
  teamTagList: string[]; // 팀 태그 리스트
  teamMemberList: string[]; // 팀 멤버 리스트
  teamMyRole: string[]; // 팀에서의 나의 역할 리스트
  storageList: IStorage[]; // 팀 자료 리스트
}

export interface getMyTeamResponse {
  name: string; // 멤버 이름
  teamList: ITeam[]; // 팀 리스트
}
