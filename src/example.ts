import { Decoder, object, number, optional, boolean, withDefault, Result } from "./";

interface User {
  id: number;
  isDog?: boolean;
}

const decoder = object({
  id: number(),
  isDog: optional(boolean())
});

const a_user: User = { id: 1 };
const user: User = Result.withException(decoder.run('{ "id": 2, "isDog": true }'));
