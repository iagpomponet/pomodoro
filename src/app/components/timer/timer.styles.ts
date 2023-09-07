import { styled } from "styled-components";

export const TimerSection = styled.section`
  background-color: var(--lavender-blush);
  padding: 3rem 1rem;
  max-width: 700px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Tab = styled.span<{ selected: boolean }>`
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: var(--rose-quartz);
  border-radius: 8px;
  color: white;
  margin: 0 1rem;
  cursor: pointer;

  ${(props) =>
    props.selected
      ? `
    background-color: var(--mountbatten-pink);
  `
      : null}

  &:hover {
    opacity: 0.8;
  }
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-size: 80px;
  margin: 100px;
  font-weight: 700;
`;

export const Button = styled.button`
  background-color: var(--mountbatten-pink);
  border: 0;
  padding: 10px;
  max-width: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  margin: 2rem auto;
  border-radius: 7px;
  height: 60px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ResultCount = styled.span`
  color: var(--space-cadet);
`;
