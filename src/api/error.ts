export const INFO = "info";
export const WARNING = "warning";
export const ERROR = "error";

export class ApiError extends Error {
  level: string;
  constructor(
    level = ERROR,
    message = "Ein unbekannter Fehler ist aufgetreten, bitte den Administrator informieren.",
    ...params: undefined[]
  ) {
    // Übergibt die verbleibenden Parameter (einschließlich Vendor spezifischer Parameter) dem Error Konstruktor
    super(...params);

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    // Benutzerdefinierte Informationen
    this.level = level;
    this.message = message;
  }
}

export class ValidationError extends Error {
  constraintViolations: string[];
  constructor(constraintViolations = [], ...params: undefined[]) {
    // Übergibt die verbleibenden Parameter (einschließlich Vendor spezifischer Parameter) dem Error Konstruktor
    super(...params);

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    // Benutzerdefinierte Informationen
    this.constraintViolations = constraintViolations;
  }
}

export class ForbiddenError extends Error {
  constructor(...params: undefined[]) {
    // Übergibt die verbleibenden Parameter (einschließlich Vendor spezifischer Parameter) dem Error Konstruktor
    super(...params);

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}

export class NotFoundError extends Error {
  constructor(...params: undefined[]) {
    // Übergibt die verbleibenden Parameter (einschließlich Vendor spezifischer Parameter) dem Error Konstruktor
    super(...params);

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}

export class RedirectError extends Error {
  constructor(...params: undefined[]) {
    // Übergibt die verbleibenden Parameter (einschließlich Vendor spezifischer Parameter) dem Error Konstruktor
    super(...params);

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RedirectError);
    }
  }
}

/**
 * Error bei OptimisticLocking Fehlern (Status Codes 409 bzw. 412)
 */
export class OptimisticLockError extends Error {
  entity: string;
  id: string;
  code: number;
  /**
   *
   * @param {String} entity Typ der Entity zum Konflikt
   * @param {String} id ID der Entity
   * @param {Number} code Status Code (409 / 412 ?)
   */
  constructor(entity: string, id: string, code: number) {
    super();

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OptimisticLockError);
    }

    this.entity = entity;
    this.id = id;
    this.code = code;
  }
}

