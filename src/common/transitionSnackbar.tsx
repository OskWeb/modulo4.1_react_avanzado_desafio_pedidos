import { Slide, SlideProps, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";

export function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />
}

type snackbarType = {
    open?: boolean,
    transition?: React.ComponentType<TransitionProps & { children: React.ReactElement<any, any> }>
}

interface Props {
    snackbarState: snackbarType,
    handleStateChange: (transition: React.ComponentType<TransitionProps & {
        children: React.ReactElement<any, any>;
    }>) => void
    message: string
}

export const TransitionsSnackbar = ((props: Props) => {

    const [state, setState] = useState<boolean | undefined>(false);

    useEffect(() => {
        setState(props.snackbarState.open);
    }, [props])

    const handleClose = () => {
        props.handleStateChange(SlideTransition);
    };

    return (
        <Snackbar
            open={state}
            onClose={handleClose}
            TransitionComponent={props.snackbarState.transition}
            message={props.message}
            key={props.snackbarState.transition?.name}
            autoHideDuration={1200}
        />
    )
});