export type WorkerController = {
	start: () => void;
	stop: () => void;
	isRunning: () => boolean;
};

export const createIntervalWorker = (
	intervalMs: number,
	job: () => Promise<void> | void
): WorkerController => {
	let timer: ReturnType<typeof setInterval> | null = null;
	let running = false;

	const run = async (): Promise<void> => {
		if (running) {
			return;
		}

		running = true;
		try {
			await job();
		} finally {
			running = false;
		}
	};

	return {
		start: () => {
			if (timer) {
				return;
			}

			void run();
			timer = setInterval(() => {
				void run();
			}, intervalMs);
		},
		stop: () => {
			if (!timer) {
				return;
			}

			clearInterval(timer);
			timer = null;
		},
		isRunning: () => timer !== null,
	};
};
