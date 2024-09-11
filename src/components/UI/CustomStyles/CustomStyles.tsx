import { FlexProps } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const TileContainer = styled.div<{ fullheight?: boolean }>`
  box-sizing: border-box;
  background-color: #fff;
  padding: 1.25rem;
  ${({ fullheight }) => fullheight && "height: 100%;"};
  border-radius: 0.75rem;
`;

export const Flex = styled.div<FlexProps>`
  display: flex;
`;

export const Wrapper = styled(Flex)`
  margin-bottom: 1.25rem;
  justify-content: space-between;
`;

export const SectionHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const Options = styled.div``;

export const ButtonsConteiner = styled.div`
  display: flex;
  gap: 1rem;
`;

export const DetailsConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
