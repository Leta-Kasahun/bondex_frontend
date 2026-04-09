import {
	generateBondexOverview,
	generateFeaturesSummary,
	generateHowItWorks,
	generateValueProposition,
	generateWelcomeBot,
} from "../services";
import { useFeatureMutation } from "@/src/features/shared/hooks";

export const useAi = () => {
	const welcomeBotMutation = useFeatureMutation(
		(payload: { businessName?: string; customerName?: string }) => generateWelcomeBot(payload)
	);
	const overviewMutation = useFeatureMutation((_payload: void) => generateBondexOverview());
	const featuresSummaryMutation = useFeatureMutation((_payload: void) => generateFeaturesSummary());
	const howItWorksMutation = useFeatureMutation((_payload: void) => generateHowItWorks());
	const valuePropositionMutation = useFeatureMutation((_payload: void) =>
		generateValueProposition()
	);

	return {
		welcomeBotMutation,
		overviewMutation,
		featuresSummaryMutation,
		howItWorksMutation,
		valuePropositionMutation,
	};
};
