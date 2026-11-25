import { useCallback, useEffect, useRef, useState } from 'react';

export type AsyncState<T> =
{status: 'loading';data: undefined;error: undefined;} |
{status: 'success';data: T;error: undefined;} |
{status: 'error';data: undefined;error: string;};

/** Runs an async loader whenever deps change; exposes loading/error/retry states. */
export function useAsync<T>(loader: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading', data: undefined, error: undefined });
  const [attempt, setAttempt] = useState(0);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', data: undefined, error: undefined });
    loaderRef.
    current().
    then((data) => {
      if (!cancelled) setState({ status: 'success', data, error: undefined });
    }).
    catch((err: unknown) => {
      if (!cancelled) {
        setState({ status: 'error', data: undefined, error: err instanceof Error ? err.message : 'Something went wrong.' });
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  return { ...state, retry };
}