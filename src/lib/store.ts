import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Log } from './types';
import { getTimestamp } from './utils/timestamp';

export const logStore: Writable<Log[]> = writable([]);

/**
 * Make a prototype for a given store
 */
export class ListStore<StoreType> {
  public store: Writable<StoreType[]>;
  constructor(storeType: Writable<StoreType[]>) {
    this.store = storeType;
  }
  public push(data: StoreType): void {
    this.store.update((value) => {
      value.push(data);
      return value;
    });
  }
};

export class LogListStore extends ListStore<Log> {
  public pushWithCurrentTimestamp(log: string): void {
    const logObject: Log = {
      log,
      timeStamp: getTimestamp()
    };
    this.store.update((value) => {
      value.push(logObject);
      return value;
    });
  }
}
