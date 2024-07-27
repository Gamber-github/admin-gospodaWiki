import styled from "styled-components";

export const Spinner: React.FC = () => {
  return (
    <Wrapper>
      <div></div>
      <div></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
