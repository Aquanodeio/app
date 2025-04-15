import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedDeployments } from "@/hooks/service";
import { Deployment } from "@/lib/types";

// Define pagination response type
interface PaginatedResponse<T> {
  data: T[];
  nextPage: number | null;
  totalPages: number;
  totalItems: number;
}

// Interface adapter to handle potential type differences
const fetchDeploymentPage = async (
  userId: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Deployment>> => {
  const response = await getPaginatedDeployments(userId, page, limit);
  
  // Convert API response format to hook's expected format if needed
  return {
    data: response.data,
    nextPage: page < response.totalPages ? page + 1 : null,
    totalPages: response.totalPages,
    totalItems: response.total
  };
};

// Infinite query for deployments pagination
export function useInfiniteDeployments(userId: string, limit = 10) {
  return useInfiniteQuery({
    queryKey: ["infiniteDeployments", userId, limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchDeploymentPage(userId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    // Only fetch the first page initially
    initialPageParam: 1,
  });
}
