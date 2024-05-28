import { NextPage } from 'next';
import styled, { keyframes } from 'styled-components';

const spinStretch = keyframes`
  50% {
    transform: rotate(360deg) scale(0.4, 0.33);
    border-width: 8px;
  }
  100% {
    transform: rotate(720deg) scale(1, 1);
    border-width: 3px;
  }
`;

const Spinner = styled.div`
  width: 2.5em;
  height: 3em;
  border: 3px solid transparent;
  border-top-color: #fc2f70;
  border-bottom-color: #fc2f70;
  border-radius: 50%;
  animation: ${spinStretch} 2s ease infinite;
`;

export default (() => {
    return <Spinner />;
}) as NextPage;

