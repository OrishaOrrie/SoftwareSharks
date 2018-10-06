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
    // --------------------------------------------------------------------------------------------------------------
    // 1xx Informational
    // --------------------------------------------------------------------------------------------------------------

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

    /**
     * <p>
     * An interim response used to inform the client that the server has accepted the complete request,
     * but has not yet completed it.
     * </p><p>
     * This status code SHOULD only be sent when the server has a reasonable expectation
     * that the request will take significant time to complete.
     * As guidance, if a method is taking longer than 20 seconds (a reasonable, but arbitrary value)
     * to process the server SHOULD return a 102 (Processing) response.
     * The server MUST send a final response after the request has been completed.
     * </p><p>
     * Methods can potentially take a long period of time to process,
     * especially methods that support the Depth header.
     * In such cases the client may time-out the connection while waiting for a response.
     * To prevent this the server may return a 102 Processing status code
     * to indicate to the client that the server is still processing the method.
     * </p><hr>
     * <small>Source: <a href="tools.ietf.org/html/rfc2518#section-10.1"> RFC2518 Section 10.1</a></small>
     */
    PROCESSING = 102,

    // --------------------------------------------------------------------------------------------------------------
    // 2xx Success
    // --------------------------------------------------------------------------------------------------------------

    /**
     * <p>The request has succeeded.</p>
     * <p>The payload sent in a 200 response depends on the request method.
     * For the methods defined by this specification, the intended meaning of the payload can be summarized as:</p>
     * <ul>
     * <li><code>GET</code> a representation of the target resource</li>
     * <li><code>HEAD</code> the same representation as <code>GET</code>, but without the representation data</li>
     * <li><code>POST</code> a representation of the status of, or results obtained from, the action;<ul>
     * <li><code>PUT</code> <code>DELETE</code> a representation of the status of the action;</li>
     * <li><code>OPTIONS</code> a representation of the communications options;</li>
     * <li><code>TRACE</code> a representation of the request message as received by the end server.</li>
     * </ul>
     * </li>
     * </ul>
     * <p>Aside from responses to CONNECT, a 200 response always has a payload,
     * though an origin server MAY generate a payload body of zero length.
     * If no payload is desired, an origin server ought to send "204 No Content" instead.
     * For CONNECT, no payload is allowed because the successful result is a tunnel,
     * which begins immediately after the 200 response header section.</p>
     * <p>A 200 response is cacheable by default;
     * i.e., unless otherwise indicated by the method definition or explicit cache controls</p>
     * </p><hr>
     * <small>Source: <a href="http://tools.ietf.org/html/rfc7231#section-6.3.1"> RFC7231 Section 6.3.1</a></small>
     */
    OKAY = 200,

    /**
     * <p>The request has been fulfilled and has resulted in one or more new resources being created.</p>
     * <p>
     * The primary resource created by the request is identified by either a Location header field in the response or,
     * if no Location field is received, by the effective request URI.</p>
     * <p>The 201 response payload typically describes and links to the resource(s) created.
     * See <a href="http://tools.ietf.org/html/rfc7231#section-7.2">Section 7.2 of RFC7231</a>
     * for a discussion of the meaning and purpose of validator header fields, such as ETag and Last-Modified,
     * in a 201 response.</p>
     * </p><hr>
     * <small>Source: <a href="http://tools.ietf.org/html/rfc7231#section-6.3.2">RFC7231 Section 6.3.2</a></small>
     */
    CREATED = 201,

    /**
     * <p>The request has been accepted for processing, but the processing has not been completed.
     * The request might or might not eventually be acted upon,
     * as it might be disallowed when processing actually takes place.</p>
     * <p>There is no facility in HTTP for re-sending a status code from an asynchronous operation.</p>
     * <p>The 202 response is intentionally noncommittal.
     * Its purpose is to allow a server to accept a request for some other process
     * (perhaps a batch-oriented process that is only run once per day)
     * without requiring that the user agent's connection to the server persist until the process is completed.
     * The representation sent with this response ought to describe the request's current status and point to
     * (or embed) a status monitor that can provide the user with an estimate of when the request will be fulfilled.</p>
     * </p><hr>
     * <small>Source: <a href="http://tools.ietf.org/html/rfc7231#section-6.3.3">RFC7231 Section 6.3.3</a></small>
     */
    ACCEPTED = 202,
    NON_AUTHORATIVE_INFO = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,
    // --------------------------------------------------------------------------------------------------------------
    // 3xx Redirection
    // --------------------------------------------------------------------------------------------------------------
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMP_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    // --------------------------------------------------------------------------------------------------------------
    // 4xx Client Error
    // --------------------------------------------------------------------------------------------------------------
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
    // --------------------------------------------------------------------------------------------------------------
    // 5xx Server Error
    // --------------------------------------------------------------------------------------------------------------
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
