import { useState, useCallback } from 'react';
import axios from 'axios';

const allowedMethods = [
    'get',
    'put',
    'post',
    'patch',
    'delete'
]

/**
 * Input the request url, method and body inside an object
 * 
 * Calling doRequest fires the fetch request, and reset will clear the hook back to initial state (data: nul)
 * 
 * @params { url, method, body }
 * @returns [{ data, loading, errors }, doRequest, reset]
*/
const useRequest = ({ url, method, body, onSuccess }) => {
    if (!allowedMethods.includes(method)) throw new Error(`Invalid method supplied to useRequest.  Received: ${method}`)

    const [response, setResponse] = useState({ data: null, loading: false, errors: null })

    const doRequest = useCallback(async () => {
      setResponse({ data: null, loading: true, errors: null })
        try {
            const { data } = await axios[method](url, body)
            setResponse({ data, loading: false, errors: null })
            if (typeof onSuccess === 'function') onSuccess(data)
        } catch (err) {
            const { errors } = err.response.data
            setResponse({ 
                data: null, 
                loading: false, 
                errors: (
                  <div className="alert alert-danger">
                    <h4>Oops...</h4>
                    <ul className="my-0">
                      {errors.map(({ message }) => (
                        <li key={message}>{message}</li>
                      ))}
                    </ul>
                  </div>
                )
            })
        }
    }, [url, method, body])

    return [response, doRequest]
}

export default useRequest;
