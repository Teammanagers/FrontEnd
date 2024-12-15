import { IUpdateMyProfile, SocialType } from '@/types/new/common';

export interface ProfileSettingsProps {
  name: string;
  setName: (name: string) => void;
  contact: string;
  setContact: (contact: string) => void;
  major: string;
  setMajor: (major: string) => void;
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  isEditing: boolean;
  toggleEditMode: () => void;
  loginProcess: SocialType;
  updateMyProfile: ({
    image,
    name,
    belong,
    phoneNumber,
    confidentRole
  }: IUpdateMyProfile) => Promise<void>;
}
