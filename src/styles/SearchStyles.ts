import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const SearchBox = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #007aff;
  }
`;
