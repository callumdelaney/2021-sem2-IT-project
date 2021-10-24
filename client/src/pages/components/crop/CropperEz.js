import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ImgDialog from "./ImgDialog";
import getCroppedImg from "./cropImage";
import { styles } from "./styles";

const Demo = ({ classes, ...props }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });

	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(
				props.img,
				croppedAreaPixels
			);
			// console.log("donee", { croppedImage });
			// setCroppedImage(URL.createObjectURL(croppedImage));
			setCroppedImage(croppedImage);
			props.callBack(croppedImage);
		} catch (e) {
			console.error(e);
		}
	}, [croppedAreaPixels, props]);

	const onClose = useCallback(() => {
		setCroppedImage(null);
	}, []);

	return (
		<div>
			<div className={classes.cropContainer}>
				<Cropper
					image={props.img}
					crop={crop}
					minZoom={0.01}
					zoom={zoom}
					// cropSize={{ width: 60, height: 120 }}
					aspect={1 / 1}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<div className={classes.controls}>
				<Button
					onClick={showCroppedImage}
					variant="contained"
					color="primary"
					classes={{ root: classes.cropButton }}
				>
					Show Result
				</Button>
			</div>
			<ImgDialog
				img={
					croppedImage === null
						? croppedImage
						: URL.createObjectURL(croppedImage)
				}
				onClose={onClose}
			/>
		</div>
	);
};

const StyledCropper = withStyles(styles)(Demo);

export default StyledCropper;
