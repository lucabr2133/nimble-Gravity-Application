import { useState } from 'react';
import type { AvaliablePositions, CandidateData } from '../types';
import { onHandleSubmit } from '../utils/onHandleSubmitPosition';
const gitHubRepo = import.meta.env.VITE_GITHUB_REPO;

export default function PositionList({
  position,
  candidate,
}: {
  position: AvaliablePositions;
  candidate: CandidateData;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <form
        onSubmit={(e) =>
          onHandleSubmit(e, position, candidate, setIsSubmitting)
        }
        className="flex flex-col justify-center items-center gap-5 border size-72 p-4 rounded-xl"
      >
        <label className="text-start w-3/4" htmlFor={position.id}>
          {position.title}
        </label>

        <input
          className="border w-3/4 p-1 rounded"
          id={position.id}
          name={'repoUrl'}
          defaultValue={gitHubRepo}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-cyan-500/40 rounded-2xl w-3/4 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </>
  );
}
