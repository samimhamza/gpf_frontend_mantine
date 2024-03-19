"use client";

import { useTranslation } from "@/app/i18n/client";
import {
	Box,
	Button,
	Center,
	Chip,
	CloseButton,
	Flex,
	Modal,
	Slider,
	Stack,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";

interface AvatarCropper {
	opened: boolean;
	close: () => void;
	lng: string;
	images: any[];
	saveImages: any;
}

const AvatarCropper = ({
	opened,
	close,
	lng,
	images,
	saveImages,
}: AvatarCropper) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const [croppedImages, setCroppedImages] = useState([]);
	const [imageIndex, setImageIndex] = useState(0);
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const xsMatches = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`);
	const imageRef = useRef();

	const convasToBlob = async (canvas: any, filename: any) => {
		return new Promise((resolve, reject) => {
			canvas.toBlob(
				(blob: any) => {
					resolve(new File([blob], filename, { type: "image/jpeg" }));
				},
				"image/jpeg",
				0.8
			);
		});
	};

	const showCroppedImage = async () => {
		try {
			setIsLoading(true);
			const canvas = imageRef.current?.getImage();
			const croppedImage = await convasToBlob(canvas, images[imageIndex].name);
			if (images.length - 1 == imageIndex) {
				saveImages([...croppedImages, croppedImage]);
				close();
			} else {
				setImageIndex(imageIndex + 1);
			}
			setCroppedImages((d) => [...d, croppedImage]);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			setIsLoading(false);
		}
	};

	return (
		<Modal
			opened={opened}
			centered
			size={xsMatches ? "450px" : "90%"}
			className="custom-modal"
			withCloseButton={false}
			onClose={close}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}
			transitionProps={{ transition: "pop" }}
			lockScroll={true}
			closeOnClickOutside={false}
		>
			<Box style={{ display: "flex", flexDirection: "row-reverse" }}>
				<CloseButton
					className="close-btn"
					aria-label="Close modal"
					onClick={close}
				/>
			</Box>
			{images.length > 1 && (
				<Chip size="sm" color="primary" mx="sm" mt="sm">
					<Box style={{ display: "flex" }}>
						<Title order={4}>{imageIndex + 1}</Title> /
						<Text>{images.length}</Text>
					</Box>
				</Chip>
			)}
			<Box>
				<Center>
					<AvatarEditor
						ref={imageRef}
						image={
							typeof images[imageIndex] == "object"
								? URL.createObjectURL(images[imageIndex])
								: images[imageIndex]
						}
						width={280}
						height={280}
						color={[0, 0, 0, 0.6]} // RGBA
						scale={zoom}
						rotate={rotation}
					/>
				</Center>
				<Box>
					<Flex
						gap="sm"
						direction="column"
						justify="center"
						align="center"
						mx="sm"
					>
						<Stack my="sm">
							<Text>{t("zoom")}</Text>
							<Slider
								value={zoom}
								min={1}
								max={3}
								step={0.1}
								onChange={setZoom}
								w={250}
							/>
						</Stack>
						<Stack mb="sm">
							<Text>{t("rotate")}</Text>
							<Slider
								value={rotation}
								min={0}
								max={360}
								step={1}
								onChange={setRotation}
								w={250}
							/>
						</Stack>
					</Flex>
					<Box m="sm">
						<Button onClick={showCroppedImage} w="100%" loading={isLoading}>
							{images.length == imageIndex + 1 ? t("save") : t("next")}
						</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default AvatarCropper;
