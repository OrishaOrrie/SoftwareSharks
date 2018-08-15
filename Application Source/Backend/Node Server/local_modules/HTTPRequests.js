// Based off of : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
module.exports.RESPONSE = {
    // Information Responses
    CONTINUE : 100,
    SWITCHING_PROTOCOL : 101,
    PROCESSING : 103,
    // Successful Responses
    OKAY : 200,
    CREATED : 201,
    ACCEPTED : 202,
    NON_AUTH_INFO : 203,
    NO_CONTENT : 204,
    RESET_CONTENT : 205,
    PARTIAL_CONTENT : 206,
    MULTI_STATUS : 207,
    MULTI_STATUS_IN : 208,
    IM_USED : 226,
    // Redirection Responses
    MULT_CHOICE : 300,
    MOVED_PERMANENT : 301,
    FOUND : 302,
    SEE_OTHER : 303,
    NOT_MODIFIED : 304,
    TEMP_REDIRECT : 307,
    PERMANENT_REDIRECT : 308,
    // Client Error Responses
    BAD_REQUEST : 400,
    UNAUTH : 401,
    FORBIDDEN : 403,
    NOT_FOUND : 404
}