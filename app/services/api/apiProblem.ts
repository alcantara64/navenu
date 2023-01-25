import { ApiResponse } from "apisauce"
import { _rootStore } from "../../models";

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true, message?:string }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true, message?:string  }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server", message?:string  }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized", message?:string  }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden", message?:string  }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found", message?:string  }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected", message?:string }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true, message?:string  }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data", message?:string  }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannot-connect", temporary: true,  message: 'Network error, Connect and try again' }
    case "NETWORK_ERROR":
      return { kind: "cannot-connect", temporary: true, message: 'Network error, Connect and try again'  }
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true, message: 'Connection Timeout'  }
    case "SERVER_ERROR":
      return { kind: "server", message: 'A server Error has occurred'  }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true,  message: 'An unknown error occurred' }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized", message: response.data?.message || 'Please Login' }
        case 403:
          return { kind: "forbidden",  message: response.data?.message }
        case 404:
          return { kind: "not-found",  message: response.data?.message }
        default:
          return { kind: "rejected",  message: response.data?.message }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}
