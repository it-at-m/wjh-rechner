import {
  ApiError,
  ERROR,
  ValidationError,
  ForbiddenError,
  OptimisticLockError,
  RedirectError,
  NotFoundError
} from "./error";

export type OptLockInfo = {
  entity: string;
  id: string;
};

export const ETAG_HEADER = "ETag";

export default {
  /**
   *  Baut den Header fuer den POST/PUT/PATCH Request auf
   * @param {String} [contentType] ein Content-Type (default: application/json)
   * @returns {Headers}
   */
  getHeaders(contentType?: string) {
    const content = contentType ? contentType : "application/json";
    return new Headers({
      "Content-Type": content
    });
  },

  /**
   * @param {String} [accept] Accept Header
   * @param {AbortSignal} [signal] a AbortSignal
   * @returns {InitRequest} the request options for a GET request
   */
  _getGETOptions(accept: string = "application/json", signal?: AbortSignal) {
    const headers = new Headers();
    headers.append("Accept", accept);
    const opts: RequestInit = {
      mode: "cors",
      credentials: "include",
      headers: headers,
      redirect: "manual",
      signal: signal
    };
    return opts;
  },

  /**
   * @param {String} [method] HTTP method
   * @param {Object} [payload] the payload
   * @param {number} [optVersion] a version
   * @param {String} [optContentType] the Content-Type
   * @returns {InitRequest} the request options for a modifying (POST/PUT/PATCH/DELETE) request
   */
  _getModifyingOptions(
    method: string,
    payload: any,
    optVersion?: number,
    optContentType?: string
  ) {
    const headers = this.getHeaders(optContentType);
    this._addIfMatchIfPresent(headers, optVersion);
    const opts: RequestInit = {
      method: method,
      headers: headers,
      body: payload ? JSON.stringify(payload) : undefined,
      mode: "cors",
      credentials: "include",
      redirect: "manual"
    };
    return opts;
  },

  _addIfMatchIfPresent(headers: Headers, optVersion?: number) {
    if (optVersion !== undefined && optVersion !== null) {
      const ifMatch = '"' + optVersion + '"';
      headers.append("If-Match", ifMatch);
    }
  },

  /**
   * Führt eine GET Anfrage durch.
   * @param {String} url die angefragte Adresse
   * @param {AbortSignal} [signal] a AbortSignal
   * @returns {Promise<Response>} die Response als Promise (siehe https://developer.mozilla.org/de/docs/Web/API/Response)
   * @throws {ApiError} wenn der Request fehlgeschlagen ist
   * @throws {ForbiddenError} bei Antwort mit Statuscode 403 - Forbidden
   * @throws {NotFoundError} bei Antwort mit Statuscode 404 - Not Found
   */
  async fetchGET(url: string, signal?: AbortSignal) {
    let response;
    try {
      response = await fetch(url, this._getGETOptions(undefined, signal));
    } catch (e) {
      throw new ApiError(ERROR);
    }
    await this._check403(response);
    await this._check404(response);
    this._checkNotOk(response);
    return response;
  },

  /**
   * Führt eine PUT Anfrage durch.
   * @param {String} url die Adresse
   * @param {Object} payload die Payload (wird zu JSON serialisiert)
   * @param {number} [version] optional: Wert für If-Match Header
   * @param {OptLockInfo} [optLockInfo] optional: Infos für die Anzeige einer Optimistic Locking Exception
   * @returns {Promise<Response>} die Response als Promise (siehe https://developer.mozilla.org/de/docs/Web/API/Response)
   * @throws {ApiError} wenn der Request fehlgeschlagen ist
   * @throws {ValidationError} wenn die backendseitige Validierung fehlgeschlagen ist (Statuscode 422)
   * @throws {ForbiddenError} bei Statuscode 403 - Forbidden
   */
  async fetchPUT(
    url: string,
    payload: any,
    version?: number,
    optLockInfo?: OptLockInfo
  ) {
    return await this._fetchModifying(
      "put",
      url,
      payload,
      version,
      optLockInfo
    );
  },

  /**
   * Führt eine DELETE Anfrage durch.
   * @param {String} url die Adresse
   * @param {number} [optVersion] optional: Wert für If-Match Header
   * @param {OptLockInfo} [optLockInfo] optional: Infos für die Anzeige einer Optimistic Locking Exception
   * @returns {Promise<Response>} die Response als Promise (siehe https://developer.mozilla.org/de/docs/Web/API/Response)
   * @throws {ApiError} wenn der Request fehlgeschlagen ist
   * @throws {ValidationError} wenn die backendseitige Validierung fehlgeschlagen ist (Statuscode 422)
   * @throws {ForbiddenError} bei Statuscode 403 - Forbidden
   */
  async fetchDELETE(
    url: string,
    optVersion?: number,
    optLockInfo?: OptLockInfo
  ) {
    let response;
    const header = new Headers();
    this._addIfMatchIfPresent(header, optVersion);
    try {
      response = await fetch(url, {
        method: "delete",
        headers: header,
        mode: "cors",
        credentials: "include",
        redirect: "manual"
      });
    } catch (e) {
      throw new ApiError(ERROR);
    }
    await this._check403(response);
    await this._checkOptLock(response, optLockInfo);
    this._checkNotOk(response);
    return response;
  },

  /**
   * Führt eine POST Anfrage durch.
   * @param {String} url die Adresse
   * @param {Object} payload die Payload (wird zu JSON serialisiert)
   * @param {number} [version] optional: Wert für If-Match Header
   * @param {OptLockInfo} [optLockInfo] optional: Infos für die Anzeige einer Optimistic Locking Exception
   * @returns {Promise<Response>} die Response als Promise (siehe https://developer.mozilla.org/de/docs/Web/API/Response)
   * @throws {ApiError}  wenn der Request fehlgeschlagen ist
   * @throws {ValidationError} wenn die backendseitige Validierung fehlgeschlagen ist (Statuscode 422)
   * @throws {ForbiddenError} bei Statuscode 403 - Forbidden
   * @throws {OptimisticLockError} bei Statuscode 409 oder 412
   */
  async fetchPOST(
    url: string,
    payload: any,
    version?: number,
    optLockInfo?: OptLockInfo
  ) {
    return await this._fetchModifying(
      "post",
      url,
      payload,
      version,
      optLockInfo
    );
  },

  /**
   * Führt eine "Modifying" (POST/PUT/PATCH Method) Anfrage durch.
   * @param {String} method Method ("post", "put", "patch")
   * @param {String} url die Adresse
   * @param {Object} payload die Payload (wird zu JSON serialisiert)
   * @param {number} [version] optional: Wert für If-Match Header
   * @param {OptLockInfo} [optLockInfo] optional: Infos für die Anzeige einer Optimistic Locking Exception
   * @returns {Promise<Response>} die Response als Promise (siehe https://developer.mozilla.org/de/docs/Web/API/Response)
   * @throws {ApiError}  wenn der Request fehlgeschlagen ist
   * @throws {ValidationError} wenn die backendseitige Validierung fehlgeschlagen ist (Statuscode 422)
   * @throws {ForbiddenError} bei Statuscode 403 - Forbidden
   * @throws {OptimisticLockError} bei Statuscode 409 oder 412
   */
  async _fetchModifying(
    method: string,
    url: string,
    payload: any,
    version?: number,
    optLockInfo?: OptLockInfo
  ) {
    let response;
    try {
      response = await fetch(
        url,
        this._getModifyingOptions(method, payload, version)
      );
    } catch (e) {
      throw new ApiError(ERROR);
    }
    await this._check403(response);
    await this._check422(response);
    await this._checkOptLock(response, optLockInfo);
    this._checkNotOk(response);
    return response;
  },

  /**
   * Checkt die Response auf Fehlercode not ok (OK Range = 200 - 299) und wirft einen ApiError in case.
   * @param {Body} response Response
   */
  _checkNotOk(response: Response) {
    if (!response.ok) {
      if (response.type == "opaqueredirect") {
        throw new RedirectError();
      } else if (response.status >= 500 && response.status <= 599) {
        throw new ApiError(
          ERROR,
          `Serverfehler - ${response.status} - ${response.statusText}`
        );
      } else {
        throw new ApiError(ERROR);
      }
    }
  },

  /**
   * Checkt die Response gegen den Statuscode für Optimistic Locking.
   * @param {Body} response Response
   * @throws {OptimisticLockError} wenn Optimistic Lock festgestellt wurde
   */
  async _checkOptLock(response: Response, optLock?: OptLockInfo) {
    if (
      optLock &&
      !response.ok &&
      (response.status == 412 || response.status == 409)
    ) {
      throw new OptimisticLockError(
        optLock.entity,
        optLock.id,
        response.status
      );
    }
  },

  /**
   * Checkt die Response gegen Statuscode 403 und wirf einen ForbiddenError in case.
   * @param {Response} response Response
   * @throws {ForbiddenError} bei 403 Response
   */
  async _check403(response: Response) {
    if (!response.ok && response.status == 403) {
      throw new ForbiddenError();
    }
  },

  /**
   * Checkt die Response gegen Statuscode 404 und wirf einen NotFoundError in case.
   * @param {Response} response Response
   * @throws {NotFoundError} bei 404 Response
   */
  async _check404(response: Response) {
    if (!response.ok && response.status == 404) {
      throw new NotFoundError();
    }
  },

  /**
   * Checkt die Response gegen Statuscode 422 und wirft einen ValidationError (inkl. geparsten Validierungsfehlermeldungen) in case.
   * @param {Response} response Response
   */
  async _check422(response: Response) {
    if (!response.ok && response.status == 422) {
      // unprocessable entity -> validation failed
      const constraintViolationResponse = await response.json();
      throw new ValidationError(
        constraintViolationResponse.constraintViolations
      );
    }
  },

  /**
   * Erzeugt aus dem Objekt einen Query-String.
   * @param params ein Objekt
   */
  buildQueryString(params: any) {
    return Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
  },

  getVersionFromHeader(headerValue: string | null | undefined) {
    if (headerValue !== null && headerValue !== undefined) {
      return Number(headerValue.replace(/["]/g, ""));
    } else {
      return undefined;
    }
  },

  /**
   * Prüft, ob das Objekt einen HATEOAS Link mit dem angegebenen Namen besitzt.
   * @param body das Objekt
   * @param linkName Name des Links
   */
  hasLink(body: any, linkName: string) {
    return body && body._links && body._links[linkName];
  }
};
