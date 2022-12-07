export const useLog = () => {
    const logDate = (date, timeOptions = {}) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            ...timeOptions,
        };
        return date.toLocaleString('ru', options);
    };

    const logRegisterTime = (date) => {
        const time = Date.now() - date;
        const oneDay = 1000 * 60 * 60 * 24;
        return {
            days: Math.round(time / oneDay),
        };
    };

    const logStatus = (status) => {
        switch (status) {
            case 'ongoing':
                return 'Онгоинг';
            case 'anons':
                return 'Анонс';
            case 'released':
                return 'Завершён';
            default:
                return status;
        }
    };

    const logErrorMessage = (message) => {
        switch (message) {
            case 'Такой логин уже существует':
                return {
                    message,
                    type: 'username',
                    formType: 'register',
                };
            case 'Такой Email уже зарегистрирован':
                return {
                    message: 'Такой Email уже зарегистрирован',
                    type: 'email',
                    formType: 'register',
                };
            default:
                return message;
        }
    };

    return {
        logDate,
        logStatus,
        logErrorMessage,
        logRegisterTime,
    };
};
