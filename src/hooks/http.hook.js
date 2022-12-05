export const useHttp = () => {
    const request = async (url, method = 'GET', body = null, headers = {}) => {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
            });

            const data = await response.json();
            return data;
        } catch (e) {
            return e.message;
        }
    };

    return {
        request,
    };
};
