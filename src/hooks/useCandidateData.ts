import { useState, useEffect } from 'react';
import type { CandidateData } from '../types';

const baseUrl = import.meta.env.VITE_BASE_URL;

export function useCandidateData(email: string) {
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;

    const controller = new AbortController();

    async function getCandidate() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${baseUrl}/api/candidate/get-by-email?email=${email}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch candidate');
        }

        const data: CandidateData = await response.json();
        setCandidate(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          setCandidate(null);
        }
      } finally {
        setLoading(false);
      }
    }

    getCandidate();

    return () => {
      controller.abort();
    };
  }, [email]);

  return { candidate, error, loading };
}
