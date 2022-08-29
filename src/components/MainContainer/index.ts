import styled from "styled-components";
import Navbar from "./Navbar";

export const MainStyles = styled.div`
  background: linear-gradient(
    172.7deg,
    #ffd370 5.12%,
    #ffd370 53.33%,
    #ffd370 53.44%,
    #ffffff 53.45%,
    #ffffff 94.32%
  );
  padding: 50px;
  @media screen and (max-width: 640px) {
    padding: 18px;
  }
`;
MainStyles.displayName = "MainStyles";

export const MainContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 2.5rem auto 0;
  @media screen and (max-width: 640px) {
    margin-top: 1rem;
  }
`;
MainContainer.displayName = "MainContainer";

export { Navbar };
