import type { AvaliablePositions, CandidateData } from '../types';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const onHandleSubmit = async (
  e: React.SubmitEvent<HTMLFormElement>,
  position: AvaliablePositions,
  candidate: CandidateData,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const repoUrl = formData.get('repoUrl') as string;

  try {
    setIsSubmitting(true);

    const response = await fetch(`${baseUrl}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid: candidate.uuid,
        jobId: position.id,
        candidateId: candidate.candidateId,
        repoUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Error applying to job');
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};
