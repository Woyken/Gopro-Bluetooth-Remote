import { Settings as SettingsV4 } from './settingsV4Json';
import { Settings as SettingsV5 } from './settingsV5Json';

export type SettingsJson = SettingsV4 | SettingsV5;

export function parseAsSettings(serialized: string) {
    const settings = JSON.parse(serialized) as SettingsJson;
    if (!settings.version) throw new Error('Invalid settings file');
    // TODO add more validation depending on schema version
    return settings;
}
