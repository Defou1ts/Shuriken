const ErrorWithCode = ({ code }) => {
	if (code === 404) {
		return (
			<div className="not-found">
				<h3 className="not-found__text">Куда ты нажал?</h3>
				<h3 className="not-found__code">{code}</h3>
				<h3 className="not-found__text">Такой страницы не существует....</h3>
				<h3 className="not-found__text">Или ее удалили?</h3>
			</div>
		);
	}

	if (code === 500) {
		return (
			<div className="not-found">
				<h3 className="not-found__code">{code}</h3>
				<h3 className="not-found__text">Ой-ей... Кажется у нас сломался сервер!</h3>
				<h3 className="not-found__text">Мы вскоре это исправим!</h3>
			</div>
		);
	}
};
export default ErrorWithCode;
