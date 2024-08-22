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
  loginProcess: string;
  updateProfile: (
    image: File | null,
    name: string,
    belong: string,
    phoneNumber: string,
    confidentRole: string[]
  ) => Promise<void>;
}
