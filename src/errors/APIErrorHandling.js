import { toast } from 'react-toastify'

const ERROR_TYPE = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

const toastConfig = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
}

const APIErrorHandling = error => {
    // Server or connection error happened
    if (!navigator.onLine) {
        // Handle offline error
        toast.error('No Internet Connection', toastConfig)
    } else {
        if (error && error.response) {
            const { data } = error.response
            const message = typeof data.error === 'string' ? data.error : data.message
            toast.error(message)
        } else if (error && error.request) {
            // client never received a response, or request never left
            toast.error(error.message)
            const { status: statusCode, data: errorMessage } = error
            const msg = ', ' + errorMessage
            // Handle Http Error (error.status === 403, 404...)
            switch (statusCode) {
                case ERROR_TYPE.BAD_REQUEST:
                    toast.error(`Bad Request ${msg}`, toastConfig)
                    break
                case ERROR_TYPE.UNAUTHORIZED:
                    toast.error(`Unauthorized ${msg}`, toastConfig)
                    break
                case ERROR_TYPE.NOT_FOUND:
                    toast.error(`Not Found ${msg}`, toastConfig)
                    break
                case ERROR_TYPE.FORBIDDEN:
                    toast.error(`Forbidden ${msg}`, toastConfig)
                    break
                case ERROR_TYPE.INTERNAL_SERVER_ERROR:
                    toast.error(`Internal Server Error ${msg}`, toastConfig)
                    break
                default:
                    break
            }
        } else {
            toast.error(error.message)
        }
    }
}
export default APIErrorHandling
