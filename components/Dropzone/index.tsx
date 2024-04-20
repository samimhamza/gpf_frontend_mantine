import { Group, Text, rem } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoHome } from "react-icons/io5";

interface CustomDropZone {
  lng: string;
  profileUrl: any;
  name: string;
  form: any;
  title: string;
}

const CustomDropzone = ({
  lng,
  profileUrl,
  name,
  form,
  title,
}: CustomDropZone) => {
  const { t } = useTranslation(lng);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState("");

  return (
    <div>
      <Dropzone
        multiple={false}
        onDrop={setFiles}
        onReject={(files) => {
          files[0]?.errors?.forEach((error) => {
            if (error.code == "file-invalid-type") {
              setError(t("invalid_file_type"));
            } else if (error.code == "file-too-large") {
              setError(t("file_too_large"));
            } else {
              setError(error.message);
            }
          });
        }}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IoHome size={22} />

            {/* <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            /> */}
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IoHome size={22} />

            {/* <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            /> */}
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IoHome size={22} />
            {/* <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            /> */}
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    </div>
  );
};

export default CustomDropzone;
