export function functionQueueProvider<T>() {
    const lastQueuedPromiseArr: { context: unknown; promise: Promise<T> }[] = [];

    /**
     * Enqueue a function to be called after the current function has finished.
     */
    return async (func: () => Promise<T>, context: unknown): Promise<T> => {
        let lastQueuedPromise = lastQueuedPromiseArr.find((p) => p.context === context);
        if (!lastQueuedPromise) {
            lastQueuedPromise = { context, promise: Promise.resolve().then(() => func()) };
            lastQueuedPromiseArr.push(lastQueuedPromise);
            return lastQueuedPromise.promise;
        }
        lastQueuedPromise.promise = lastQueuedPromise.promise.then(() => func());
        return lastQueuedPromise.promise;
    };
}
