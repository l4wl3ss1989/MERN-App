import styled from 'styled-components';
import { setTheme } from '../../theme/theme';

const { text, background, border } = setTheme().colors;

export const StyledDiv = styled.div`
  color: ${text};
  background: ${background};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${border};
  border-radius: 3px;
  text-align: center;
`;

export const StyledForm = styled.form`
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: white;
`;
