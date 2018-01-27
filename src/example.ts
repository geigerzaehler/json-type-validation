import { Decoder, object, number, optional, boolean } from "./";

interface User {
  id: number;
  isDog?: boolean;
}

const decoder = object({
  id: number(),
  isDog: optional(boolean())
});

const a_user = { id: 1 };
const user: User = decoder.runWithDefault(a_user, '{ "id": 2, "isDog": true }');
