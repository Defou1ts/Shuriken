export const useLog = () => {
    const logDate = date => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
        };
        return date.toLocaleString('ru', options);
    };
    const logStatus = status => {
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

    const logErrorMessage = message => {
        switch (message) {
            case 'такой логин уже существует':
                return {
                    message,
                    type: 'username',
                };
            case 'Firebase: Error (auth/email-already-in-use).':
                return {
                    message: 'такой Email уже существует',
                    type: 'email',
                };
            default:
                return message;
        }
    };

    return {
        logDate,
        logStatus,
        logErrorMessage,
    };
};
