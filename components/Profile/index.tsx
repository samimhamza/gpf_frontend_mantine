import { useTranslation } from "@/app/i18n/client";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import AvatarCropper from "./AvatarCropper";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface ProfileProps {
  lng: string;
  profileUrl: any;
  name: string;
  form: any;
  title: string;
}

const Profile = ({ lng, profileUrl, name, form, title }: ProfileProps) => {
  const { t } = useTranslation(lng);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState("");

  const addImage = (croptedImages: any) => {
    profileUrl.current = URL.createObjectURL(croptedImages[0]);
    form.setFieldValue(name, croptedImages[0]);
    setError("");
  };

  useEffect(() => {
    if (files.length) {
      open();
    }
  }, [files, open]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      // Clear the timer if status changes before 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <Box>
        <Center>
          <Title order={5} mb="sm">
            {title}
          </Title>
        </Center>
        <Center>
          <Dropzone
            multiple={false}
            onDrop={setFiles}
            onReject={(files) => {
              files[0]?.errors?.forEach((error) => {
                if (error.code == "file-invalid-type") {
                  setError(t("invalid_file_type"));
                } else if (error.code == "file-too-large") {
                  setError(t("file_larger_than_2mb_not_allowed"));
                } else {
                  setError(error.message);
                }
              });
            }}
            maxSize={2 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              style={{ cursor: "pointer" }}
              pos="relative"
              className="dropzone"
            >
              {profileUrl.current && (
                <ActionIcon
                  size="xs"
                  radius="xl"
                  color="red"
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "0",
                    zIndex: 1000,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    profileUrl.current = "";
                    form.setFieldValue("deleted", true);
                  }}
                >
                  <IoClose size={16} />
                </ActionIcon>
              )}
              <Avatar size={100} src={profileUrl.current} />
              <ActionIcon
                className="edit-icon"
                size="xs"
                radius="xl"
                color="primary"
              >
                <MdEdit size={14} />
              </ActionIcon>
            </Group>
          </Dropzone>
        </Center>
        {error && (
          <Text mt="sm" c="red" style={{ display: "block" }}>
            {error}
          </Text>
        )}
      </Box>

      {opened && (
        <AvatarCropper
          opened={opened}
          close={close}
          lng={lng}
          images={files}
          saveImages={addImage}
        />
      )}
      <style jsx global>{`
        .edit-icon {
          position: absolute;
          bottom: 10px;
          right: 0;
           {
            /* display: none; */
          }
        }
         {
          /* .dropzone:hover + .edit-icon,
				.dropzone:focus + .edit-icon {
					display: block !important;
				} */
        }
      `}</style>
    </>
  );
};
export default Profile;
