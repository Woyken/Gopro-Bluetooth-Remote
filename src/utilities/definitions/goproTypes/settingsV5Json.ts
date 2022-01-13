export interface Settings {
    version: number;
    schema_version: 5;
    modes: Mode[];
    ui_mode_groups: UIModeGroup[];
    settings: SettingsSetting[];
    filters: Filter[];
    commands: SettingsCommand[];
    status: Status;
    display_hints_categories: DisplayHintsCategory[];
    display_hints: DisplayHint[];
}

interface SettingsCommand {
    key: string;
    deprecated: boolean;
    network_types: NetworkType[];
}

enum NetworkType {
    Ble = 'ble',
    Wifi = 'wifi',
}

interface DisplayHint {
    key: string;
    display_name: string;
    settings: DisplayHintSetting[];
    commands: DisplayHintCommand[];
}

interface DisplayHintCommand {
    command_key: string;
    display_name: string;
    widget_type: string;
    precedence: number;
}

interface DisplayHintSetting {
    setting_id: number;
    widget_type: WidgetType;
    precedence: number;
}

enum WidgetType {
    Select = 'select',
    Slider = 'slider',
    Toggle = 'toggle',
}

interface DisplayHintsCategory {
    key: string;
    groups: string[];
}

interface Filter {
    activated_by: ActivatedBy[];
    blacklist: Blacklist[];
}

type ActivatedBy =
    | {
          status_id: number;
          values: number[];
      }
    | {
          values: number[];
          setting_id: number;
      };

interface Blacklist {
    setting_id: number;
    values: number[];
}

interface Mode {
    id: number;
    display_name: string;
}

interface SettingsSetting {
    display_name: string;
    id: number;
    options: Option[];
}

interface Option {
    id: number;
    display_name: string;
    value: number;
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

interface UIModeGroup {
    display_name: string;
    id: number;
    modes: number[];
}
