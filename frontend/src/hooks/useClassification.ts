import { useState, useCallback } from "react";
import { classifySession } from "../services/api";
import type { ClassificationResponse, ClassifyRequest, ApiError } from "../types/api";

interface UseClassificationState {
  result: ClassificationResponse | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseClassificationReturn extends UseClassificationState {
  classify: (payload: ClassifyRequest) => Promise<void>;
  reset: () => void;
}

export function useClassification(): UseClassificationReturn {
  const [state, setState] = useState<UseClassificationState>({
    result: null,
    loading: false,
    error: null,
  });

  const classify = useCallback(async (payload: ClassifyRequest): Promise<void> => {
    setState({ result: null, loading: true, error: null });

    try {
      const response = await classifySession(payload);

      if (!response.success) {
        setState({
          result: null,
          loading: false,
          error: { message: "Backend returned a failed response.", status: 200 },
        });
        return;
      }

      setState({ result: response, loading: false, error: null });
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");

        setState({
          result: null,
          loading: false,
          error: {
            message: error.message,
            detail: error.stack,
          },
        });
      }
  }, []);₹

  const reset = useCallback(() => {
    setState({ result: null, loading: false, error: null });
  }, []);

  return { ...state, classify, reset };
}
