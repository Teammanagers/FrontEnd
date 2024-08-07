import * as Avatar from '@radix-ui/react-avatar';
import UserImage from '@assets/mypage/user-image.svg';
import styled from 'styled-components';

export const AvatarImage = () => {
  return (
    <ImageContainer>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image
          className="AvatarImage"
          src={UserImage}
          alt="프로필 이미지"
        />
        <Avatar.Fallback delayMs={600}>AB</Avatar.Fallback>
      </Avatar.Root>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 228px;
  border: none;
  cursor: pointer;

  .AvatarRoot {
    width: 150px;
    height: 150px;
    border-radius: 228px;
    border: none;
    cursor: pointer;
  }

  .AvatarImage {
    width: 100%;
  }
`;
