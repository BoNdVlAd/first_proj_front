const APIWrapper = () => {
    const request = async (url: string, config: {}): Promise<any> => {
        config = {
            ...config,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                Origin: process.env.REACT_APP_BACKEND_URL,
            },
        }
        url = process.env.REACT_APP_BACKEND_URL + url

        if (localStorage.getItem('access_token')) {
            config = {
                ...config,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    // 'Access-Control-Allow-Origin':
                    //     process.env.REACT_APP_BACKEND_URL,
                    Origin: process.env.REACT_APP_BACKEND_URL,
                },
            }
        }
        config = {
            ...config,
            credentials: 'include',
            withCredentials: true,
            origin: 'http://localhost:3006',
        }
        const request = new Request(url, config)
        const response = await fetch(request)
        const data = await response.json()

        if (
            typeof data?.access_token == 'string' &&
            data?.access_token.length > 0
        ) {
            localStorage.setItem('access_token', data.access_token)
        }

        return { data: data, status: response.status }
    }

    const get = async (url: string, config?: {}): Promise<any> => {
        const init = {
            method: 'GET',
            ...config,
        }

        return await request(url, init)
    }

    const post = async (url: string, body: {}, config?: {}) => {
        const init = {
            method: 'POST',
            body: JSON.stringify(body),
            ...config,
        }

        return request(url, init)
    }

    const patch = async (url: string, body: {}, config?: {}) => {
        const init = {
            method: 'PATCH',
            body: JSON.stringify(body),
            ...config,
        }

        return request(url, init)
    }

    const remove = async (url: string, config?: {}) => {
        const init = {
            method: 'DELETE',
            ...config,
        }

        return request(url, init)
    }

    return { get, post, patch, remove }
}

export default APIWrapper
