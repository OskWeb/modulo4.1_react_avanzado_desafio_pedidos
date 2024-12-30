import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)}
            className='backButton'
        >
            <ArrowBackIcon />
            Volver
        </button>
    )
}