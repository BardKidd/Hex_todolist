import styled from "styled-components";
import DecorateBox from "./DecorateBox";

export const HomeContainer = styled.div`
  background-color: #ffd370;
  min-height: 100vh;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 50px;
  @media screen and (max-width: 640px) {
    display: block;
  }
`;

export { DecorateBox };
