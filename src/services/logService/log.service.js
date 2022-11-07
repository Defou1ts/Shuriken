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
    return {
        logDate,
        logStatus,
    };
};
