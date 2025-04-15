import { useQuery } from "@tanstack/react-query";

export function useGetServiceTypes() {
  return useQuery({
    queryKey: ["serviceTypes"],
    queryFn: () => {
      // TODO: get service types from API
      // const serviceTypes = getServiceTypes();

      const serviceTypes = [
        {
          id: 1,
          name: "JUPYTER",
        },
        {
          id: 2,
          name: "BACKEND",
        },
      ];
      return serviceTypes;
    },
  });
}
