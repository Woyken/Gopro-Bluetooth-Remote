import { RootState } from 'store/store';
import { throwExpression } from 'utilities/throwExpression';

import { createSelector } from '@reduxjs/toolkit';

const SCHEMA_V4_CURRENT_MODE_SETTING_ID = 92;
const SCHEMA_V5_CURRENT_MODE_STATUS_ID = 89;

export const selectSettingsMetadataSettingsJson = createSelector(
    (state: RootState) => state.goproSettingsMetadataReducer.settingsJson,
    (settingsJson) => settingsJson
);

export const selectSettingsMetadataIsSettingsReady = createSelector(
    (state: RootState) => state.goproSettingsMetadataReducer.isFetching,
    selectSettingsMetadataSettingsJson,
    (isFetching, settingsJson) => !isFetching && !!settingsJson
);

export const selectSettingsMetadataSchemaVersion = createSelector(
    selectSettingsMetadataSettingsJson,
    selectSettingsMetadataIsSettingsReady,
    (settingsJson, isSettingsReady) => settingsJson?.schema_version ?? (isSettingsReady ? 1 : 0)
);

export interface SettingsMetadataSetting {
    id: number;
    displayName: string;
    options: {
        id: number;
        value: number;
        displayName: string;
    }[];
}

export const selectSettingsMetadataAllSettings = createSelector(selectSettingsMetadataSettingsJson, (settingsJson): SettingsMetadataSetting[] => {
    if (!settingsJson) return [];
    switch (settingsJson.schema_version) {
        case 4: {
            return settingsJson.modes
                .map((mode) => mode.settings)
                .flat()
                .map((setting) => ({
                    id: setting.id,
                    displayName: setting.display_name,
                    options: setting.options.map((option) => ({ id: option.value, value: option.value, displayName: option.display_name })),
                }));
        }
        case 5: {
            return settingsJson.settings.map((setting) => ({
                id: setting.id,
                displayName: setting.display_name,
                options: setting.options.map((option) => ({ id: option.id, value: option.value, displayName: option.display_name })),
            }));
        }
        default:
            throw new Error('Unknown settings schema version');
    }
});

export const selectSettingsMetadataAllSettingsById = createSelector(selectSettingsMetadataAllSettings, (allSettings) => {
    return allSettings.reduce((acc, setting) => {
        acc[setting.id] = setting;
        return acc;
    }, {} as Record<number, SettingsMetadataSetting>);
});

interface SettingsMetadataFilter {
    activatedBy: (
        | {
              settingId: number;
              values: Set<number>;
          }
        | {
              statusId: number;
              values: Set<number>;
          }
    )[];
    blacklist: {
        settingId: number;
        values: Set<number>;
    }[];
}

export const selectSettingsMetadataFilters = createSelector(selectSettingsMetadataSettingsJson, (settingsJson): SettingsMetadataFilter[] => {
    if (!settingsJson) return [];
    switch (settingsJson.schema_version) {
        case 4: {
            return settingsJson.filters.map((filter) => {
                const filterActivatedBy = filter.activated_by.map((activatedBy) => {
                    if ('setting_value' in activatedBy) {
                        return {
                            settingId: activatedBy.setting_id,
                            values: new Set([activatedBy.setting_value]),
                        };
                    }
                    if ('status_id' in activatedBy) {
                        return {
                            statusId: activatedBy.status_id,
                            values: new Set(activatedBy.values),
                        };
                    }
                    return {
                        settingId: activatedBy.setting_id,
                        values: new Set(activatedBy.values),
                    };
                });
                const filterBlacklist = [{ settingId: filter.blacklist.setting_id, values: new Set(filter.blacklist.values) }];
                return {
                    activatedBy: filterActivatedBy,
                    blacklist: filterBlacklist,
                };
            });
        }
        case 5: {
            return settingsJson.filters.map((filter) => {
                const filterActivatedBy = filter.activated_by.map((activatedBy) => {
                    if ('setting_id' in activatedBy) {
                        return {
                            settingId: activatedBy.setting_id,
                            values: new Set(activatedBy.values),
                        };
                    }
                    return {
                        statusId: activatedBy.status_id,
                        values: new Set(activatedBy.values),
                    };
                });
                const filterBlacklist = filter.blacklist.map((blacklist) => ({
                    settingId: blacklist.setting_id,
                    values: new Set(blacklist.values),
                }));
                return {
                    activatedBy: filterActivatedBy,
                    blacklist: filterBlacklist,
                };
            });
        }
        default:
            throw new Error('Unknown settings schema version');
    }
});

function mergeToBlacklist(existingList: SettingsMetadataFilter['blacklist'], addList: SettingsMetadataFilter['blacklist']) {
    return existingList.concat(addList).reduce((acc, curr) => {
        if (!acc.some((item) => item.settingId === curr.settingId)) {
            acc.push(curr);
        }
        return acc;
    }, [] as SettingsMetadataFilter['blacklist']);
}

function reduceFiltersToRecord(filters: SettingsMetadataFilter[]) {
    return filters
        .map((filter) => ({
            modeIds: new Set(...filter.activatedBy.map((activatedBy) => activatedBy.values)),
            blacklist: filter.blacklist,
        }))
        .reduce((acc, filter) => {
            filter.modeIds.forEach((modeId) => {
                const existingBlacklistsForMode = acc[modeId];
                if (existingBlacklistsForMode) acc[modeId] = mergeToBlacklist(existingBlacklistsForMode, filter.blacklist);
                else acc[modeId] = filter.blacklist;
            });
            return acc;
        }, {} as Record<number, SettingsMetadataFilter['blacklist']>);
}

/**
 * Getting only filters that are filtering by current mode.
 * When those filters are applied we'll get list of settings that should be displayed for this one mode.
 */
const selectFiltersThatFilterByModeIdOnly = createSelector(selectSettingsMetadataSchemaVersion, selectSettingsMetadataFilters, (schemaVersion, filters) => {
    switch (schemaVersion) {
        case 4:
            return reduceFiltersToRecord(
                filters.filter((filter) => filter.activatedBy.every((activatedBy) => ('settingId' in activatedBy ? activatedBy.settingId === SCHEMA_V4_CURRENT_MODE_SETTING_ID : false)))
            );

        case 5:
            return reduceFiltersToRecord(
                filters.filter((filter) => filter.activatedBy.every((activatedBy) => ('statusId' in activatedBy ? activatedBy.statusId === SCHEMA_V5_CURRENT_MODE_STATUS_ID : false)))
            );
        default:
            throw new Error('Unknown settings schema version');
    }
});

const selectActiveFilterBlacklists = createSelector(
    (state: RootState) => state.goproSettingsReducer.settings,
    (state: RootState) => state.goproSettingsReducer.statuses,
    selectSettingsMetadataFilters,
    // TODO think about using re-reselector.
    // would optimize performance, cache each setting current value by id
    // but then would need to change how all settings list is being accessed
    (currentSettings, currentStatuses, filters) =>
        filters
            .map((filter) => {
                const isFilterActive = filter.activatedBy.every((activatedBy) => {
                    if ('settingId' in activatedBy) {
                        const settingValue = currentSettings[activatedBy.settingId]?.value;
                        return typeof settingValue === 'number' ? activatedBy.values.has(settingValue) : false;
                    }
                    const statusValue = currentStatuses[activatedBy.statusId];
                    return typeof statusValue === 'number' ? activatedBy.values.has(statusValue) : false;
                });
                if (!isFilterActive) return [];
                return filter.blacklist;
            })
            .flat()
);

const selectActiveFilterBlacklistsMerged = createSelector(selectActiveFilterBlacklists, (activeFilters) => {
    return activeFilters.reduce((acc, filter) => {
        const existing = acc[filter.settingId];
        if (existing) {
            acc[filter.settingId] = new Set([...existing, ...filter.values]);
        } else {
            acc[filter.settingId] = filter.values;
        }
        return acc;
    }, {} as Record<number, Set<number>>);
});

const selectCurrentActiveModeId = createSelector(
    selectSettingsMetadataSchemaVersion,
    (state: RootState) => state.goproSettingsReducer.settings[SCHEMA_V4_CURRENT_MODE_SETTING_ID]?.value,
    (state: RootState) => state.goproSettingsReducer.statuses[SCHEMA_V5_CURRENT_MODE_STATUS_ID],
    (schemaVersion, settingCurrentModeId, statusCurrentModeId) => {
        switch (schemaVersion) {
            case 4:
                if (settingCurrentModeId === undefined) throw new Error('Current mode id not initialized yet');
                return settingCurrentModeId;
            case 5:
                if (typeof statusCurrentModeId !== 'number') throw new Error('Current mode id not initialized yet');
                return statusCurrentModeId;
            default:
                throw new Error('Unknown settings schema version');
        }
    }
);

/**
 * We need this list to know which settings to display for mode.
 * Without it there's no way to know if this setting is meant for photo or video mode.
 * Find filters that are limiting only by mode ids.
 */
const selectModeOnlyBlacklistsBySettingIdForCurrentMode = createSelector(selectCurrentActiveModeId, selectFiltersThatFilterByModeIdOnly, (currentModeId, filtersThatFilterByModeIdOnly) => {
    return (
        filtersThatFilterByModeIdOnly[currentModeId]?.reduce((acc, blacklist) => {
            const existing = acc[blacklist.settingId];
            if (existing) {
                acc[blacklist.settingId] = new Set([...existing, ...blacklist.values]);
            } else {
                acc[blacklist.settingId] = blacklist.values;
            }
            return acc;
        }, {} as Record<number, Set<number>>) || {}
    );
});

const selectProtuneSettingId = createSelector(selectSettingsMetadataSettingsJson, selectModeOnlyBlacklistsBySettingIdForCurrentMode, (settingsJson, blacklists) => {
    switch (settingsJson?.schema_version) {
        case 4: {
            const protuneSettings = settingsJson.modes
                .map((x) => x.settings)
                .flat()
                .filter((x) => x.path_segment === 'protune' && !blacklists[x.id])
                .map((x) => x.id);
            if (protuneSettings.length > 1) throw new Error('Found multiple protune settings, should only be 1 per mode');
            return protuneSettings[0];
        }
        case 5: {
            return 114;
        }
        default:
            throw new Error('Unknown settings schema version');
    }
});

const selectModeSettingsIdsHiddenBehindProtune = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
    switch (settingsJson?.schema_version) {
        case 4: {
            return new Set(
                settingsJson.modes
                    .map((x) => x.settings)
                    .flat()
                    .filter((x) => x.path_segment.startsWith('protune_'))
                    .map((x) => x.id)
            );
        }
        case 5: {
            const foundHint = settingsJson.display_hints.find((hint) => hint.key === 'GPCAMERA_GROUP_PROTUNE');
            if (!foundHint) throw new Error('Could not find GPCAMERA_GROUP_PROTUNE hint');
            return new Set(foundHint.settings.map((x) => x.setting_id));
        }
        default:
            throw new Error('Unknown settings schema version');
    }
});

const selectModeSettingsIdsAlwaysShown = createSelector(
    selectSettingsMetadataSettingsJson,
    selectProtuneSettingId,
    selectModeSettingsIdsHiddenBehindProtune,
    (settingsJson, protuneSettingId, modeSettingsIdsHiddenBehindProtune) => {
        switch (settingsJson?.schema_version) {
            case 4: {
                const foundHint = settingsJson.display_hints.find((hint) => hint.key === 'GPCAMERA_GROUP_MODE');
                if (!foundHint) throw new Error('GPCAMERA_GROUP_MODE hint not found');
                return new Set(foundHint.settings.map((setting) => setting.setting_id).filter((x) => !modeSettingsIdsHiddenBehindProtune.has(x) && x !== protuneSettingId));
            }
            case 5: {
                const foundHint = settingsJson.display_hints.find((hint) => hint.key === 'GPCAMERA_GROUP_MODE');
                if (!foundHint) throw new Error('GPCAMERA_GROUP_MODE hint not found');
                return new Set(foundHint.settings.map((setting) => setting.setting_id));
            }
            default:
                throw new Error('Unknown settings schema version');
        }
    }
);

/**
 * Gets available settings for current mode. These should be displayed unconditionally.
 * If after applying full filter it has no options, show it disabled.
 */
const selectCurrentModeSettings = createSelector(
    selectModeSettingsIdsAlwaysShown,
    selectProtuneSettingId,
    selectModeSettingsIdsHiddenBehindProtune,
    selectModeOnlyBlacklistsBySettingIdForCurrentMode,
    (state: RootState) => state.goproSettingsReducer.settings,
    selectSettingsMetadataAllSettingsById,
    (modeSettingsIdsAlwaysShown, protuneSettingId, modeSettingsIdsHiddenBehindProtune, blacklists, currentSettings, allSettingsByIds) => {
        const isProtuneEnabled = protuneSettingId ? currentSettings[protuneSettingId]?.value : undefined;
        let settingsIds = new Set([...modeSettingsIdsAlwaysShown]);
        if (protuneSettingId) settingsIds.add(protuneSettingId);
        if (isProtuneEnabled) settingsIds = new Set([...settingsIds, ...modeSettingsIdsHiddenBehindProtune]);
        const settings = [...settingsIds].map((id) => allSettingsByIds[id] || throwExpression(`Setting ${id} not found in settings list`));
        return settings
            .map((setting) => {
                const blacklistForThisSetting = blacklists[setting.id];
                if (!blacklistForThisSetting) return setting;
                return {
                    ...setting,
                    options: setting.options.filter((option) => !blacklistForThisSetting.has(option.id)),
                };
            })
            .filter((setting) => setting.options.length > 0);
    }
);

/**
 * These are all settings in settings menu for current mode.
 * Some will have 0 options, because of filters. Show then disabled.
 */
export const selectFilteredCurrentModeSettings = createSelector(
    selectActiveFilterBlacklistsMerged,
    selectCurrentModeSettings,
    selectSettingsMetadataAllSettingsById,
    (state: RootState) => state.goproSettingsReducer.settings,
    (activeFilterBlacklists, currentModeSettings, allSettingsByIds, currentSettings) => {
        return (
            currentModeSettings
                .map((setting) => {
                    const filterForThisSetting = activeFilterBlacklists[setting.id];
                    if (!filterForThisSetting) return setting;
                    return {
                        ...setting,
                        options: setting.options.filter((option) => !filterForThisSetting.has(option.id)),
                    };
                })
                // If setting has no options after filtering, show it disabled with current value
                .map((setting) => {
                    if (setting.options.length > 0) return setting;
                    const currentSettingValue = currentSettings[setting.id]?.value;
                    const currentOption =
                        allSettingsByIds[setting.id]?.options.find((option) => option.id === currentSettingValue) ||
                        throwExpression(`Could not find option ${currentSettingValue} for setting ${setting.id} ${setting.displayName}`);
                    return { ...setting, options: [currentOption] };
                })
        );
    }
);
