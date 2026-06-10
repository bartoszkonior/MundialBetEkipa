import styled from "styled-components";

const ProgressBar = styled.div`
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
  height: 0.6rem;
  width: 100%;
`;

const Progress = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => props.percent}%;
  height: 100%;
`;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--color-text-light);
  width: 100%;
`;

const PointsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const getProgressColor = (percent) => {
  if (percent > 60) return "#4caf50";
  if (percent > 45) return "#8bc34a";
  if (percent > 30) return "#ffc107";
  if (percent > 15) return "#ff9800";
  return "#f44336";
};

// 61% - 100% #4caf50
// 46% - 60%  #8bc34a
// 31% - 45% #ffc107
// 16% - 30% #ff9800
// 0% - 15% #f44336

const Points = ({ scored, total }) => {
  const percent = (scored / total) * 100;
  const color = getProgressColor(percent);

  return (
    <PointsWrapper>
      <PointsHeader>
        <span>Zdobyte punkty:</span>
        <span>
          {scored} / {total} pkt
        </span>
      </PointsHeader>

      <ProgressBar>
        <Progress percent={percent} color={color} />
      </ProgressBar>
    </PointsWrapper>
  );
};

export default Points;
