export class ErrorNotFound extends Error {}
export class ErrorBadRequest extends Error {}
export class ErrorInternalServerError extends Error {}

export const errorMap = new Map([
  [400, ErrorBadRequest],
  [404, ErrorNotFound],
  [500, ErrorInternalServerError],
]);
