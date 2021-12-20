interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}

interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
}
