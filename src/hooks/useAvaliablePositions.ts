import { useState, useEffect } from 'react';
import type { AvaliablePositions } from '../types';

const baseUrl = import.meta.env.VITE_BASE_URL;

export function useAviablePositions() {
  const [positions, setPositions] = useState<AvaliablePositions[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getAvaliablePostions() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}/api/jobs/get-list`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch available positions');
        }

        const data: AvaliablePositions[] = await response.json();
        setPositions(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getAvaliablePostions();

    return () => {
      controller.abort();
    };
  }, []);

  return { positions, error, loading };
}
