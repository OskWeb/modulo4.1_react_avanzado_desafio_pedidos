import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} style={{
            width: '120px',
            height: '40px',
            display: 'flex',
            padding: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        }}>
            <ArrowBackIcon />
            Volver
        </button>
    )
}