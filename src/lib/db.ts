import 'server-only';
import { getSql } from './postgres-client.mjs';

// Resolve configuration on first query, so builds do not need database access.
export const sql = new Proxy(function () {} as unknown as ReturnType<typeof getSql>, {
  apply(_target, thisArg, args) { return Reflect.apply(getSql(), thisArg, args); },
  get(_target, property) { return Reflect.get(getSql(), property); },
});
