import React from "react";
import TagCreatorDialog from "./TagCreatorDialog";
import { Button } from "@material-ui/core";
function TagCreator() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCallBack = () => {
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create Tag
            </Button>
            <TagCreatorDialog
                open={open}
                callBack={handleCallBack} /*onClose={handleClose}*/
            />
        </div>
    );
}

export default TagCreator;
