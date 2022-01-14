export interface Settings {
    version: number;
    schema_version: 4;
    modes: Mode[];
    filters: Filter[];
    commands: SettingsCommand[];
    status: Status;
    services: Services;
    camera_mode_map: CameraModeMap[];
    display_hints: DisplayHint[];
}

interface CameraModeMap {
    description: string;
    mapping_type: MappingType;
    mode_value: number;
    sub_mode_value: number;
    wsdk_mode_group_key: WsdkModeGroupKey;
    wsdk_mode_key: string;
}

enum MappingType {
    Read = 'read',
    ReadWrite = 'read_write',
}

enum WsdkModeGroupKey {
    Multishot = 'multishot',
    Photo = 'photo',
    Video = 'video',
}

interface SettingsCommand {
    key: string;
    display_name: string;
    url: string;
    widget_type: CommandWidgetType;
    deprecated: boolean;
    network_types: NetworkType[];
    status_field?: string;
    min_length?: number;
    max_length?: number;
    regex?: string;
}

enum NetworkType {
    Ble = 'ble',
    Wifi = 'wifi',
}

enum CommandWidgetType {
    Button = 'button',
    Child = 'child',
    Readonly = 'readonly',
    Text = 'text',
    Toggle = 'toggle',
}

interface DisplayHint {
    key: 'GPCAMERA_GROUP_MODE' | 'GPCAMERA_GROUP_SETUP' | 'GPCAMERA_GROUP_DELETE_ID' | 'GPCAMERA_GROUP_CAMERA_INFO' | 'GPCAMERA_GROUP_CONNECTIONS' | 'GPCAMERA_GROUP_CAMERA_STATUS';
    display_name: string;
    settings: DisplayHintSetting[];
    commands: DisplayHintCommand[];
}

interface DisplayHintCommand {
    command_key: string;
    precedence: number;
}

interface DisplayHintSetting {
    setting_id: number;
    widget_type: SettingWidgetType;
    precedence: number;
}

enum SettingWidgetType {
    Select = 'select',
    Slider = 'slider',
    Toggle = 'toggle',
}

interface Filter {
    activated_by: ActivatedBy[];
    blacklist: Blacklist;
}

type ActivatedBy =
    | { setting_id: number; setting_value: number }
    | {
          status_id: number;
          values: number[];
      }
    | {
          setting_id: number;
          values: number[];
      };

interface Blacklist {
    setting_id: number;
    values: number[];
}

interface Mode {
    path_segment: string;
    display_name: string;
    value: number;
    settings: ModeSetting[];
}

interface ModeSetting {
    path_segment: string;
    display_name: string;
    id: number;
    options: Option[];
}

interface Option {
    display_name: string;
    value: number;
}

interface Services {
    live_stream_start: FwUpdate;
    live_stream_stop: FwUpdate;
    media_list: FwUpdate;
    media_metadata: FwUpdate;
    platform_auth: FwUpdate;
    fw_update: FwUpdate;
    supports_app_clipping: FwUpdate;
}

interface FwUpdate {
    version: number;
    description: string;
    url: string;
}

interface Status {
    groups: Group[];
}

interface Group {
    group: string;
    fields: Field[];
}

interface Field {
    id: number;
    name: string;
    levels?: string[];
}
