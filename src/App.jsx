import { Convertr } from './components/organisms/Convertr';
import { Header } from './components/organisms/Header';
import { LoadingContextContainer } from './context/LoadingContext';

export default function App() {
    return (
        <LoadingContextContainer>
            <Header />
            <Convertr />
        </LoadingContextContainer>
    );
}
