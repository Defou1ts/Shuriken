import './settingsRedButton.scss';

const SettingsRedButton = ({ children, onClick }) => {
	return (
		<button onClick={onClick} className="settings__red-button">
			{children}
		</button>
	);
};
export default SettingsRedButton;
