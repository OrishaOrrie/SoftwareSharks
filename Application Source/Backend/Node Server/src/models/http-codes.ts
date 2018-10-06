/**
 * This model wraps all HTTP status codes into an easy to read
 * and easy to implement interface.
 * @file     http-codes.ts
 * @author   Mark Coetzer
 * @version  1.0
 * @since    06-10-2018
 */

/**
 * @name HTTP_STATUS_CODES
 * <br>
 * This model wraps all HTTP status codes into an easy to read
 * and easy to implement interface.
 */
export enum HTTP_STATUS_CODES {
    // 1xx Informational

    /**
     * <p>
     * The initial part of a request has been received and has not yet been rejected by the server.
     * The server intends to send a final response after the request has been fully received and acted upon.
     * </p><p>
     * When the request contains an Expect header field that includes a 100-continue expectation,
     * the 100 response indicates that the server wishes to receive the request payload body.
     * The client ought to continue sending the request and discard the 100 response.
     * If the request did not contain an Expect header field containing the 100-continue expectation,
     * the client can simply discard this interim response.
     * </p><hr>
     * <small>Source: <a href="https://tools.ietf.org/html/rfc7231#section-6.2.1"> RFC7231 Section 6.2.1</a></small>
     */
    CONTINUE = 100,

    /**
     * <p>
     * The server understands and is willing to comply with the client's request,
     * via the Upgrade header field1, for a change in the application protocol being used on this connection.
     * </p><p>
     * The server MUST generate an Upgrade header field in the response that indicates
     * which protocol(s) will be switched to immediately after the empty line that terminates the 101 response.
     * </p><p>
     * It is assumed that the server will only agree to switch protocols when it is advantageous to do so.
     * For example, switching to a newer version of HTTP might be advantageous over older versions,
     * and switching to a real-time, synchronous protocol might be advantageous when delivering
     * resources that use such features.
     * </p><hr>
     * <small>Source: <a href="https://tools.ietf.org/html/rfc7231#section-6.2.2"> RFC7231 Section 6.2.2</a></small>
     */
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    // 2xx Success
    OKAY = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORATIVE_INFO = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,
    // 3xx Redirection
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMP_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    // 4xx Client Error
    BAD_REQUEST = 400,
    UNAUTHORISED = 401,
    PAYHMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTH_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUEST_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    CONNECTION_CLOSED_WITHOUT_RESPONSE = 444,
    UNAVAILABLE_LEGAL_REASONS = 451,
    CLIENT_CLOSED_REQUEST = 499,
    // 5xx Server Error
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
    NETWORK_CONNECT_TIMEOUT = 599
}
