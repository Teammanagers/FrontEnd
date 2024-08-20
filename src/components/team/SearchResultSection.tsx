import { GetTeamByCodeResponse } from 'src/types/team';
import styled from 'styled-components';

interface SearchResultSectionProps {
  data: GetTeamByCodeResponse;
}

const SearchResultSection = ({ data }: SearchResultSectionProps) => {
  return (
    <SearchResult>
      <ImagePlaceholder src={data?.result.team.imageUrl} />
      <Description>
        <p>{data?.result.team.title}</p>
        <div>
          {data?.result.team.teamTagList.map((tag) => (
            <div key={tag.tagId}>{tag.name}</div>
          ))}
        </div>
      </Description>
    </SearchResult>
  );
};

const SearchResult = styled.div`
  display: flex;
  margin-top: 8px;
`;

const ImagePlaceholder = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 38px;
`;

const Description = styled.div`
  margin-left: 23px;
  font-weight: 500;

  p {
    margin: 0;
    font-weight: 500;
  }

  > div {
    display: flex;

    > div {
      margin-top: 15px;
      margin-right: 13px;
      padding: 5px 6px;
      border-radius: 3px;
      background-color: #ffffff;
      color: #5c9eff;
      font-weight: 500;
      font-size: 12px;
    }
  }
`;

export default SearchResultSection;
