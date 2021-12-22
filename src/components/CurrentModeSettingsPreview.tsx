import { useAppSelector } from 'store/hooks';
import { selectCurrentModeSettingsPreviewMainTexts } from 'store/selectors/settingsSelectors';

const CurrentModeSettingsPreview: React.FC = () => {
    const mainSettingTexts = useAppSelector(selectCurrentModeSettingsPreviewMainTexts);
    return (
        <p style={{ textAlign: 'center', margin: 'auto' }}>
            {mainSettingTexts.map((text, index) => (
                <span key={text}>
                    {index > 0 ? '|' : null}
                    {text}
                </span>
            ))}
        </p>
    );
};

export default CurrentModeSettingsPreview;
