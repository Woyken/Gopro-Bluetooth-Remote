import createCachedSelector from 're-reselect';
import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';
import { throwExpression } from 'utilities/throwExpression';

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

interface SettingsMetadataSetting {
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

function reduceFiltersToRecord(filters: SettingsMetadataFilter[]) {
    return filters
        .map((filter) => ({
            modeIds: new Set(...filter.activatedBy.map((activatedBy) => activatedBy.values)),
            blacklist: filter.blacklist,
        }))
        .reduce((acc, filter) => {
            filter.modeIds.forEach((modeId) => {
                const existing = acc[modeId];
                if (existing) existing.push(...filter.blacklist);
                else acc[modeId] = filter.blacklist;
            });
            return acc;
        }, {} as Record<number, SettingsMetadataFilter['blacklist']>);
}

/**
 * Getting only filters that are filtering by current mode.
 * When those filters are applied we'll get list of settings that should be displayed for this one mode.
 */
const selectSettingsMetadataPerModeSettingsListFilters = createSelector(selectSettingsMetadataSchemaVersion, selectSettingsMetadataFilters, (schemaVersion, filters) => {
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
                const isFilterActive = filter.activatedBy.some((activatedBy) => {
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

const selectCurrentModeLimitedSettingsListBlacklist = createSelector(selectCurrentActiveModeId, selectSettingsMetadataPerModeSettingsListFilters, (currentModeId, activeModeBlacklists) => {
    return (
        activeModeBlacklists[currentModeId]?.reduce((acc, blacklist) => {
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

// TODO split GPCAMERA_GROUP_MODE and GPCAMERA_GROUP_PROTUNE
const selectSettingsMetadataDisplayHintsModeSettingsList = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
    switch (settingsJson?.schema_version) {
        case 4: {
            const foundHint = settingsJson.display_hints.find((hint) => hint.key === 'GPCAMERA_GROUP_MODE');
            if (!foundHint) throw new Error('GPCAMERA_GROUP_MODE hint not found');
            return {
                displayName: foundHint.display_name,
                settings: foundHint.settings,
            };
        }
        case 5: {
            const foundHint = settingsJson.display_hints.find((hint) => hint.key === 'GPCAMERA_GROUP_MODE');
            if (!foundHint) throw new Error('GPCAMERA_GROUP_MODE hint not found');
            return {
                displayName: foundHint.display_name,
                settings: foundHint.settings,
            };
        }
        default:
            throw new Error('Unknown settings schema version');
    }
});

const selectSettingsMetadataModeSettingsListFromHints = createSelector(selectSettingsMetadataDisplayHintsModeSettingsList, selectSettingsMetadataAllSettingsById, (hint, allSettingsById) => {
    return hint.settings.map((setting) => ({
        displayData: setting,
        metadata: allSettingsById[setting.setting_id] || throwExpression(`Setting ${setting.setting_id} not found in settings list`),
    }));
});

/**
 * Gets available settings for current mode. These should be displayed unconditionally.
 * If after applying full filter it has no options, show it disabled.
 */
const selectCurrentModeLimitedSettingList = createSelector(selectSettingsMetadataModeSettingsListFromHints, selectCurrentModeLimitedSettingsListBlacklist, (allSettingsMetadata, blacklists) => {
    return allSettingsMetadata
        .map((setting) => {
            const blacklistForThisSetting = blacklists[setting.metadata.id];
            if (!blacklistForThisSetting) return setting.metadata;
            return {
                ...setting.metadata,
                options: setting.metadata.options.filter((option) => !blacklistForThisSetting.has(option.id)),
            };
        })
        .filter((setting) => setting.options.length > 0);
});

/**
 * These are all settings in settings menu for current mode.
 * Some will have 0 options, because of filters. Show then disabled.
 */
const selectSettingsMetadataFilteredCurrentModeSettings = createSelector(selectActiveFilterBlacklistsMerged, selectCurrentModeLimitedSettingList, (activeFilters, modeLimitedSettingsMetadata) => {
    return modeLimitedSettingsMetadata.map((setting) => {
        const filterForThisSetting = activeFilters[setting.id];
        if (!filterForThisSetting) return setting;
        return {
            ...setting,
            options: setting.options.filter((option) => !filterForThisSetting.has(option.id)),
        };
    });
});

// TODO use GPCAMERA_GROUP_MODE and GPCAMERA_GROUP_PROTUNE to get a list of setting to display in ui
// display GPCAMERA_GROUP_MODE settings, when protune is enabled display GPCAMERA_GROUP_MODE setting and GPCAMERA_GROUP_PROTUNE settings
// schemaVer 5 - protune setting id 114
// schemaVer 4 - has multiple protune settings, depending on mode
// schemaVer 4 - doesn't have split GPCAMERA_GROUP_MODE and GPCAMERA_GROUP_PROTUNE. Only single GPCAMERA_GROUP_MODE with all settings in it.
// noticed for schemaVer4 that there are some settings that have path value starting with "protune_", maybe I can fake a GPCAMERA_GROUP_PROTUNE group from those settings
