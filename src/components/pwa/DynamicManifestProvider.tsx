import { useDynamicManifest } from 'hooks/pwaDynamicManifest';

const DynamicManifestProvider: React.FC = (props) => {
    const { children } = props;
    useDynamicManifest();
    return <>{children}</>;
};

export default DynamicManifestProvider;
