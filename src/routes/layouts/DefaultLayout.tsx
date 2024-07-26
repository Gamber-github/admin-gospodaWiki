import React, { ReactNode } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import { Layout } from "antd";

const { Content } = Layout;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const StyledContent = styled(Content)`
  height: 100%;
  overflow-x: auto;
  background-color: #f0f2f5;
`;

export const DefaultLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Sidebar />
      <StyledContent>{children}</StyledContent>
    </Container>
  );
};
