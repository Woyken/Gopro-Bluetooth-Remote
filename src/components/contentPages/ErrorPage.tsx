import { Container } from '@mui/material';

interface IProps {
    errorTitle: string;
    errorDescription: string;
}

export const ErrorPage: React.FC<IProps> = (props) => {
    const { errorTitle, errorDescription } = props;
    return (
        <Container maxWidth="sm">
            <h1>{errorTitle}</h1>
            <p>{errorDescription}</p>
        </Container>
    );
};
