export enum HttpStatus {
  // =========================Success=========================
  OK = 200, // Request succeeded
  CREATED = 201, // Resource created successfully
  NO_CONTENT = 204, // Request succeeded but no content to return
  RESET_CONTENT = 205, // Reset document view
  PARTIAL_CONTENT = 206, // Partial content returned (for range requests)
  MULTI_STATUS = 207, // WebDAV; Multi-status response

  // =========================Redirections=========================
  MOVED_PERMANENTLY = 301, // Permanent redirect
  FOUND = 302, // Temporary redirect
  SEE_OTHER = 303, // Redirect to different resource/method
  NOT_MODIFIED = 304, // Cached resource is still valid
  TEMPORARY_REDIRECT = 307, // Temporary redirect (preserves method)
  PERMANENT_REDIRECT = 308, // Permanent redirect (preserves method)

  // =========================Client Errors=========================
  BAD_REQUEST = 400, // Invalid request syntax or parameters
  UNAUTHORIZED = 401, // Authentication required or failed
  PAYMENT_REQUIRED = 402, // Reserved for future use (payment processing)
  FORBIDDEN = 403, // Access denied
  NOT_FOUND = 404, // Resource not found
  METHOD_NOT_ALLOWED = 405, // HTTP method not allowed
  NOT_ACCEPTABLE = 406, // Client cannot accept the response format
  PROXY_AUTHENTICATION_REQUIRED = 407, // Proxy authentication required
  REQUEST_TIMEOUT = 408, // Server timed out waiting for request
  CONFLICT = 409, // Conflict in resource state
  GONE = 410, // Resource permanently removed
  LENGTH_REQUIRED = 411, // Content-Length header is required
  PRECONDITION_FAILED = 412, // Precondition headers failed
  PAYLOAD_TOO_LARGE = 413, // Request entity too large
  URI_TOO_LONG = 414, // Request-URI too long
  UNSUPPORTED_MEDIA_TYPE = 415, // Unsupported media type
  RANGE_NOT_SATISFIABLE = 416, // Range specified is not satisfiable
  EXPECTATION_FAILED = 417, // Server cannot meet expectation
  IM_A_TEAPOT = 418, // I'm a teapot (RFC 2324, April Fools' joke)
  MISDIRECTED_REQUEST = 421, // Request directed to wrong server (HTTP/2)
  UNPROCESSABLE_ENTITY = 422, // Semantic errors in request (WebDAV)
  LOCKED = 423, // Resource is locked (WebDAV)
  FAILED_DEPENDENCY = 424, // Failed dependency (WebDAV)
  TOO_EARLY = 425, // Too Early (TLS upgrade)
  UPGRADE_REQUIRED = 426, // Upgrade Required
  PRECONDITION_REQUIRED = 428, // Precondition Required
  TOO_MANY_REQUESTS = 429, // Rate limit exceeded
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431, // Request header fields too large
  UNAVAILABLE_FOR_LEGAL_REASONS = 451, // Unavailable for legal reasons

  // =========================Server Errors=========================
  INTERNAL_SERVER_ERROR = 500, // General server error
  NOT_IMPLEMENTED = 501, // Feature not implemented
  BAD_GATEWAY = 502, // Bad gateway response from upstream
  SERVICE_UNAVAILABLE = 503, // Server temporarily unavailable
  GATEWAY_TIMEOUT = 504, // Server timed out while acting as a gateway
  HTTP_VERSION_NOT_SUPPORTED = 505, // HTTP version not supported
  VARIANT_ALSO_NEGOTIATES = 506, // Variant also negotiates (Content Negotiation)
  INSUFFICIENT_STORAGE = 507, // Insufficient storage (WebDAV)
  LOOP_DETECTED = 508, // Loop detected (WebDAV)
  NOT_EXTENDED = 510, // Not extended
  NETWORK_AUTHENTICATION_REQUIRED = 511, // Network authentication required
}
