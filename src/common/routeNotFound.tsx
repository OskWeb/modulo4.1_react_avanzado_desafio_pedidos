export const RouteNotFound: React.FC = () => {
    return (
        <div className="RouteNotFound">
            <div className="contentBox">
                <div className="error-title">
                    <span className="error-title-right">
                        404
                    </span>
                </div>
                <div className="error-message">
                    <span className="error-message-up">Algo a ido mal.</span>
                    <span className="error-message-down">Falta esta página o has montado el enlace incorrectamente.</span>
                </div>
            </div>
        </div>
    )
}