import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsMetadataSetting } from 'store/selectors/settingsMetadataSelectors';

export function useTranslatedSetting(setting: SettingsMetadataSetting) {
    const { t, i18n } = useTranslation();
    const translatedSetting = useMemo(() => {
        const settingNamePath = `settings.${setting.id}.name`;
        const settingName = i18n.exists(settingNamePath) ? t(settingNamePath as any) : setting.displayName;
        const options = setting.options.map((o) => {
            const settingOptionNamePath = `settings.${setting.id}.options.${o.id}.name`;
            const optionName = i18n.exists(settingOptionNamePath) ? t(settingOptionNamePath as any) : o.displayName;
            return {
                ...o,
                displayName: optionName,
            };
        });
        return {
            ...setting,
            displayName: settingName,
            options,
        };
    }, [setting, i18n, t]);
    return translatedSetting;
}
