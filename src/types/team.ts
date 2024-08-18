export interface TeamTag {
  tagId?: number;
  name: string;
}

export interface TeamData {
  teamId?: number;
  title?: string;
  teamCode?: string;
  imageUrl?: string;
  teamTagList?: TeamTag[];
}
