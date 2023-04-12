export function createLogger(...scope: unknown[]) {
	return {
		log(...data: unknown[]) {
			console.group(...scope);
			console.log(...data);
			console.groupEnd();
		},
		createLogger(...innerScope: unknown[]) {
			return createLogger(...scope, ...innerScope);
		},
	};
}
