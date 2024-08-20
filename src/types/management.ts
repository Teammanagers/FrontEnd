export interface Tag {
  name: string;
}

export interface TeamTag extends Tag {
  tagId?: number;
}

export interface RoleTag extends Tag {
  teamManageId?: number;
}

export interface TeamData {
  teamId?: number;
  title?: string;
  teamCode?: string;
  imageUrl?: string;
  teamTagList?: TeamTag[];
}
