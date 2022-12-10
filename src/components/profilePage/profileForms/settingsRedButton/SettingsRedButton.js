import './settingsRedButton.scss';

const SettingsRedButton = ({ children, handleSave }) => {
	return (
		<button onClick={handleSave} className="settings__red-button">
			{children}
		</button>
	);
};
export default SettingsRedButton;
