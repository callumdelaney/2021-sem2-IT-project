import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ImgDialog from "./ImgDialog";
import getCroppedImg from "./cropImage";
import { styles } from "./styles";

// const dogImg =
//     "https://media.danmurphys.com.au/dmo/product/12225-1.png?impolicy=PROD_MD";

const Demo = ({ classes, ...props }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    var dogImg = props.img;

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                dogImg,
                croppedAreaPixels,
                rotation
            );
            console.log("donee", { croppedImage });
            setCroppedImage(URL.createObjectURL(croppedImage));
            props.callBack(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);

    return (
        <div>
            <div className={classes.cropContainer}>
                <Cropper
                    image={dogImg}
                    crop={crop}
                    rotation={rotation}
                    minZoom={0.01}
                    zoom={zoom}
                    // cropSize={{ width: 60, height: 120 }}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className={classes.controls}>
                {/* <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{ root: classes.sliderLabel }}
                    >
                        Zoom
                    </Typography>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        classes={{ container: classes.slider }}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </div>
                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{ root: classes.sliderLabel }}
                    >
                        Rotation
                    </Typography>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="Rotation"
                        classes={{ container: classes.slider }}
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                </div> */}
                <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.cropButton }}
                >
                    Show Result
                </Button>
            </div>
            <ImgDialog img={croppedImage} onClose={onClose} />
        </div>
    );
};

const StyledCropper = withStyles(styles)(Demo);

export default StyledCropper;
