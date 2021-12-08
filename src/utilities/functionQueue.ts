export const lastQueuedPromiseArr: { context: unknown; promise: Promise<void> }[] = [];

/**
 * Enqueue a function to be called after the current function has finished.
 */
export async function functionQueue(func: () => Promise<void>, context: unknown) {
    let lastQueuedPromise = lastQueuedPromiseArr.find((p) => p.context === context);
    if (!lastQueuedPromise) {
        lastQueuedPromise = { context, promise: Promise.resolve() };
        lastQueuedPromiseArr.push(lastQueuedPromise);
    }
    lastQueuedPromise.promise = lastQueuedPromise.promise.then(() => func());
    await lastQueuedPromise.promise;
}
