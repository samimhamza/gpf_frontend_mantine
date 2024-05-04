"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { sharedStatuses } from "@/shared/columns";
import { getDateTime } from "@/shared/functions";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  Menu,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoChevronDown } from "react-icons/go";
import { TbEdit } from "react-icons/tb";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { CHANGE_STATUS, UPDATE_SCHOOLS } from "@/shared/constants/Permissions";
import SchoolModal from "./SchoolModal";

const SchoolInfo = ({
  schoolId,
  databaseID,
  lng,
  school,
  loading,
  mutate,
}: {
  schoolId: string | undefined;
  databaseID: number;
  lng: string;
  school: any;
  loading: boolean;
  mutate: any;
}) => {
  const { t } = useTranslation(lng);
  const theme = useMantineTheme();
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const statuses = sharedStatuses(t);
  const callApi = useAxios();
  const [statusLoading, setStatusLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const checkPermission = (permission: string) => {
    const hasPermission = permissionChecker(permission);
    return hasPermission && school?.status == "active";
  };

  const getStatus = (status: string) => {
    return statuses.find((item) => item.status == status);
  };

  const getMenu = (id: number, currentStatus: string) =>
    statuses.map((item, index) => (
      <Menu.Item
        key={index}
        onClick={() => changeStatus(id, currentStatus, item.status)}
      >
        {item.text}
      </Menu.Item>
    ));

  const changeStatus = async (
    id: number,
    currentStatus: string,
    newStatus: string
  ) => {
    if (currentStatus != newStatus) {
      setStatusLoading(true);
      const { status } = await callApi({
        method: "PUT",
        url: "schools/" + id + "/status",
        data: {
          status: newStatus,
        },
      });
      if (status == 202) {
        mutate();
      } else if (status == 226) {
        toast.error(t("status_change_not_allowed"));
      } else {
        toast.error(t("something_went_wrong"));
      }
      setStatusLoading(false);
    }
  };

  const badge = (
    <Badge
      style={{ cursor: "pointer" }}
      color={getStatus(school?.status)?.color}
      rightSection={<GoChevronDown size={16} />}
      p="sm"
    >
      {statusLoading ? (
        <Center>
          <Loader size={20} color="white" />
        </Center>
      ) : (
        <Text size="md" fw={500}>
          {getStatus(school?.status)?.text}
        </Text>
      )}
    </Badge>
  );

  return (
    <>
      <Paper withBorder shadow="sm" mb="md">
        <Flex
          justify={{ base: "center", xs: "space-between" }}
          align="center"
          className="applicant-title"
          p="md"
          gap="sm"
          wrap="wrap"
        >
          <Title order={3}>{t("school_info")}</Title>
          <Group>
            {permissionChecker(CHANGE_STATUS) ? (
              <Menu shadow="md" width={100}>
                <Menu.Target>{badge}</Menu.Target>
                <Menu.Dropdown>
                  {getMenu(school?.id, school?.status)}
                </Menu.Dropdown>
              </Menu>
            ) : (
              badge
            )}
            {checkPermission(UPDATE_SCHOOLS) && (
              <Button
                onClick={() => open()}
                rightSection={<TbEdit size={16} />}
              >
                {t("edit")}
              </Button>
            )}
          </Group>
        </Flex>
        <Box pos="relative" p="md">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Flex
            px="sm"
            direction={{ base: "column", sm: "row" }}
            gap="sm"
            pt="sm"
            justify="center"
            wrap="wrap"
          >
            <Group flex={1} wrap="nowrap" className="flex-item">
              <Text className="title">{t("id")} :</Text>
              <Text>{schoolId}</Text>
            </Group>
            <Group flex={1} wrap="nowrap">
              <Text className="title">{t("office")} :</Text>
              <Text>{school?.office?.name}</Text>
            </Group>
          </Flex>

          <Flex
            px="sm"
            direction={{ base: "column", sm: "row" }}
            gap="sm"
            pt="sm"
            justify="center"
          >
            <Group flex={1} wrap="nowrap">
              <Text className="title">{t("name")} :</Text>
              <Text>{school?.name}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("total_staff")} :</Text>
              <Text>{school?.total_staff}</Text>
            </Group>
          </Flex>
          <Flex
            px="sm"
            direction={{ base: "column", sm: "row" }}
            gap="sm"
            pt="sm"
            justify="center"
          >
            <Group flex={1} wrap="nowrap">
              <Text className="title">{t("head_name")} :</Text>
              <Text>{school?.head_name}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("head_phone")} :</Text>
              <Text>{school?.head_phone}</Text>
            </Group>
          </Flex>
          <Flex
            px="sm"
            direction={{ base: "column", sm: "row" }}
            gap="sm"
            pt="sm"
            justify="center"
          >
            <Group flex={1} wrap="nowrap">
              <Text className="title">{t("province")} :</Text>
              <Text>{school?.province.name_fa}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("district")} :</Text>
              <Text>{school?.district.name_fa}</Text>
            </Group>
          </Flex>
          <Flex
            px="sm"
            direction={{ base: "column", sm: "row" }}
            gap="sm"
            pt="sm"
            justify="center"
          >
            <Group flex={1} wrap="nowrap">
              <Text className="title">{t("school_type")} :</Text>
              <Text>{school?.type}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("address")} :</Text>
              <Text>{school?.address}</Text>
            </Group>
          </Flex>
          <Flex
            px="sm"
            direction={{ base: "column", sm: "row" }}
            gap="sm"
            pt="sm"
            justify="center"
          >
            <Group flex={1}>
              <Text className="title">{t("created_by")} :</Text>
              <Text>{school?.created_by?.schoolname}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("updated_by")} :</Text>
              <Text>{school?.updated_by?.schoolname}</Text>
            </Group>
          </Flex>
          <Flex
            px="sm"
            direction={{ base: "column", sm: "row" }}
            gap="sm"
            pt="sm"
            justify="center"
          >
            <Group flex={1}>
              <Text className="title">{t("created_at")} :</Text>
              {school?.created_at && (
                <Text>{getDateTime(school?.created_at)}</Text>
              )}
            </Group>
            <Group flex={1}>
              <Text className="title">{t("updated_at")} :</Text>
              {school?.updated_at && (
                <Text>{getDateTime(school?.updated_at)}</Text>
              )}
            </Group>
          </Flex>
        </Box>
      </Paper>
      {opened && (
        <SchoolModal
          opened={opened}
          close={() => {
            close();
          }}
          lng={lng}
          setMutated={mutate}
          title={t("update_school")}
          editId={databaseID}
        />
      )}
      <style jsx global>{`
        .applicant-title {
          border-bottom: 1px solid var(--mantine-color-gray-4);
        }
        .title {
          font-weight: bold;
        }
        @media (min-width: ${mdMatches}) {
          .flex-item {
            flex-basis: calc(50% - 6px);
          }
        }
        @media (max-width: ${mdMatches}) {
          .flex-item {
            flex-basis: calc(100% - 12px);
          }
        }
      `}</style>
    </>
  );
};

export default SchoolInfo;
