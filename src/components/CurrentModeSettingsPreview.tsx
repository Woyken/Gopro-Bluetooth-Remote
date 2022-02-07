import { useTranslatedSetting } from 'hooks/translatedSetting';
import { useAppSelector } from 'store/hooks';
import { selectCurrentModePreviewSettings } from 'store/selectors/settingsMetadataSelectors';

const CurrentModeSettingsPreview: React.FC = () => {
    const previewSettings = useAppSelector(selectCurrentModePreviewSettings);
    return (
        <p style={{ textAlign: 'center', margin: 'auto' }}>
            {previewSettings.map((setting, index) => (
                // TODO
                // eslint-disable-next-line react/no-array-index-key
                <span key={setting.id}>
                    {index > 0 ? '|' : null}
                    <SingleSettingText setting={setting} />
                </span>
            ))}
        </p>
    );
};

const SingleSettingText: React.FC<{ setting: ReturnType<typeof selectCurrentModePreviewSettings>[0] }> = (props) => {
    const { setting } = props;
    const { currentOptionId } = setting;
    const translatedSetting = useTranslatedSetting(setting);
    const currentOption = translatedSetting.options.find((x) => x.id === currentOptionId);
    if (!currentOption) return <>Missing setting option!</>;
    return <>{currentOption.displayName}</>;
};
export default CurrentModeSettingsPreview;
