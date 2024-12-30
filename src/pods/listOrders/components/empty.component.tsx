import { useNavigate } from "react-router-dom";

export const Empty = () => {

    const navigate = useNavigate();

    return (
        <div className="emptyCreateOrderBox">
            <div className="emptyCreateOrderTextInfo">
                <span>No tienes ningún pedido</span>
                <span>Crea uno facilmente</span>
            </div>

            <button onClick={() => navigate('/orders/new_order')}>Crear pedido</button>

        </div>
    )
}