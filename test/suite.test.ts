import { assert, describe, expect, it } from 'vitest';
import { defineWebWorkers } from '@vitest/web-worker/pure';

defineWebWorkers();
describe('vitest web worker', () => {
  it('data sent matches data received', async () => {
    const worker = new Worker('src/worker');
    const msgData = 'test';
    const workerRespPromise = new Promise((resolve, reject) => {
      worker.addEventListener('message', (event) => {
        resolve(event.data);
        setTimeout(() => reject('No msg resp'), 1000);
      });
    });
    worker.postMessage(msgData);
    await expect(workerRespPromise).resolves.toStrictEqual(msgData);
  });
});
