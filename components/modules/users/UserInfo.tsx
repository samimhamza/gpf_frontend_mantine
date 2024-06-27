"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ThreeSharedStatuses } from "@/shared/columns";
import { getDateTime } from "@/shared/functions";
import {
  Avatar,
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
import { CHANGE_STATUS, UPDATE_USERS } from "@/shared/constants/Permissions";
import UserModal from "./UserModal";

const UserInfo = ({
  userId,
  databaseID,
  lng,
  user,
  loading,
  mutate,
}: {
  userId: string | undefined;
  databaseID: number;
  lng: string;
  user: any;
  loading: boolean;
  mutate: any;
}) => {
  const { t } = useTranslation(lng);
  const theme = useMantineTheme();
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const statuses = ThreeSharedStatuses(t);
  const callApi = useAxios();
  const [statusLoading, setStatusLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const checkPermission = (permission: string) => {
    const hasPermission = permissionChecker(permission);
    return hasPermission && user?.status == "active";
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
        url: "users/" + id + "/status",
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
      color={getStatus(user?.status)?.color}
      rightSection={<GoChevronDown size={16} />}
      p="sm"
    >
      {statusLoading ? (
        <Center>
          <Loader size={20} color="white" />
        </Center>
      ) : (
        <Text size="md" fw={500}>
          {getStatus(user?.status)?.text}
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
          <Title order={3}>{t("user_info")}</Title>
          <Group>
            {permissionChecker(CHANGE_STATUS) ? (
              <Menu shadow="md" width={100}>
                <Menu.Target>{badge}</Menu.Target>
                <Menu.Dropdown>{getMenu(user?.id, user?.status)}</Menu.Dropdown>
              </Menu>
            ) : (
              badge
            )}
            {checkPermission(UPDATE_USERS) && (
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
            mb={5}
          >
            <Group flex={1} wrap="nowrap" className="flex-item">
              <Text className="title">{t("profile")} :</Text>
              <Center>
                <Avatar src={user?.profile} alt="profile" size={60} />
              </Center>
            </Group>
          </Flex>
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
              <Text>{userId}</Text>
            </Group>
            <Group flex={1} wrap="nowrap">
              <Text className="title">{t("office")} :</Text>
              <Text>{user?.office?.name}</Text>
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
              <Text>{user?.full_name}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("username")} :</Text>
              <Text>{user?.username}</Text>
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
              <Text className="title">{t("email")} :</Text>
              <Text>{user?.email}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("status")} :</Text>
              <Text>{user?.status}</Text>
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
              <Text>{user?.created_by?.username}</Text>
            </Group>
            <Group flex={1}>
              <Text className="title">{t("updated_by")} :</Text>
              <Text>{user?.updated_by?.username}</Text>
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
              {user?.created_at && <Text>{getDateTime(user?.created_at)}</Text>}
            </Group>
            <Group flex={1}>
              <Text className="title">{t("updated_at")} :</Text>
              {user?.updated_at && <Text>{getDateTime(user?.updated_at)}</Text>}
            </Group>
          </Flex>
        </Box>
      </Paper>
      {opened && (
        <UserModal
          opened={opened}
          close={() => {
            close();
          }}
          lng={lng}
          setMutated={mutate}
          title={t("update_user")}
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

export default UserInfo;
