export interface Role {
  tagId: number;
  name: string;
}

export interface MemberTypes {
  teamManageId: number;
  name: string;
  imageUrl?: string;
  roleList?: Role[];
}
