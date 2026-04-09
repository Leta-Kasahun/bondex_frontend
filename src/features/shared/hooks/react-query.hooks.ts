import {
	type QueryKey,
	type UseMutationOptions,
	type UseMutationResult,
	type UseQueryOptions,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

export const buildFeatureKey = (...parts: Array<string | number | undefined>): QueryKey => {
	return parts.filter((part) => part !== undefined) as QueryKey;
};

export const useFeatureQuery = <TData>(
	options: UseQueryOptions<TData, Error, TData, QueryKey>
): UseQueryResult<TData, Error> => {
	return useQuery(options);
};

export const useFeatureMutation = <TData, TVariables>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn"> & {
		invalidateKeys?: QueryKey[];
	}
): UseMutationResult<TData, Error, TVariables> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		...options,
		onSuccess: async (data, variables, context) => {
			if (options?.invalidateKeys?.length) {
				await Promise.all(
					options.invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key }))
				);
			}

			await options?.onSuccess?.(data, variables, context);
		},
	});
};
