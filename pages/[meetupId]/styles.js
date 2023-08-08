import { styled } from "styled-components";

export const Wrapper = styled.div`
.center-align {
  display: flex;
  justify-content: center;
}
`

export const DeleteCTA = styled.div`
font: inherit;
width: fit-content;
color: #77002e;
border: 1px solid #77002e;
background-color: transparent;
padding: 0.5rem 1.5rem;
border-radius: 4px;
  &:hover {
    background-color: #ffe2ed;
    cursor: pointer;
  }
`