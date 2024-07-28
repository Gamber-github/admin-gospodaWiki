import styled from "styled-components";
import { LoginComponent } from "../components/Login/LoginComponent";

export const Login = () => {
  return (
    <Container>
      <LoginComponent />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: aliceblue;
`;
