import { useCandidateData } from './hooks/useCandidateData';
import { useAviablePositions } from './hooks/useAvaliablePositions';
import PositionList from './components/postitionList';

function App() {
  const {
    candidate,
    error: candidateError,
    loading: candidateLoading,
  } = useCandidateData('lucab2188@gmail.com');

  const {
    error: positionError,
    loading: positionLoading,
    positions,
  } = useAviablePositions();

  if (candidateLoading || positionLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (candidateError || positionError) {
    return (
      <div className="text-red-500 mt-10 text-center">Error loading data</div>
    );
  }
  if (!candidate) {
    return <div>No candidate found</div>;
  }

  return (
    <div className="w-screen flex justify-center">
      <div className="flex w-3/4 flex-wrap gap-5 justify-center items-center">
        {positions?.map((position) => (
          <PositionList
            key={position.id}
            position={position}
            candidate={candidate}
          ></PositionList>
        ))}
      </div>
    </div>
  );
}

export default App;
