"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { teamStatuses } from "@/shared/columns";
// import { Genders, getType, StaffTypes, SurveyTypes } from "@/shared/constants";
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
// import TeacherModal from "../../teachers/TeacherModal";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  CHANGE_STATUS,
  UPDATE_APPLICANT_PACKAGE_IMPLEMENTS,
  UPDATE_TEAMS,
} from "@/shared/constants/Permissions";

const TeamInfo = ({
  teamId,
  databaseID,
  lng,
  team,
  loading,
  mutate,
}: {
  teamId: string | undefined;
  databaseID: number;
  lng: string;
  team: any;
  loading: boolean;
  mutate: any;
}) => {
  const { t } = useTranslation(lng);
  // const types = SurveyTypes(t);
  // const genders = Genders(t);
  // const staffTypes = StaffTypes(t);
  const theme = useMantineTheme();
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const statuses = teamStatuses(t);
  const callApi = useAxios();
  const [statusLoading, setStatusLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const checkPermission = (permission: string) => {
    const hasPermission = permissionChecker(permission);
    return hasPermission && team?.status == "active";
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
        url: "teams/" + id + "/status",
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
      color={getStatus(team?.status)?.color}
      rightSection={<GoChevronDown size={16} />}
      p="sm"
    >
      {statusLoading ? (
        <Center>
          <Loader size={20} color="white" />
        </Center>
      ) : (
        <Text size="md" fw={500}>
          {getStatus(team?.status)?.text}
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
          <Title order={3}>{t("team_info")}</Title>
          {/* {team?.profile && (
            <Center>
              <Avatar
                size={80}
                src={team?.profile}
                style={{ cursor: "pointer" }}
              />
            </Center>
          )} */}
          <Group>
            {checkPermission(UPDATE_TEAMS) && (
              <Button
                onClick={() => open()}
                rightSection={<TbEdit size={16} />}
              >
                {t("edit")}
              </Button>
            )}
            {permissionChecker(CHANGE_STATUS) ? (
              <Menu shadow="md" width={100}>
                <Menu.Target>{badge}</Menu.Target>
                <Menu.Dropdown>{getMenu(team?.id, team?.status)}</Menu.Dropdown>
              </Menu>
            ) : (
              badge
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
              <Text>{t("id")} :</Text>
              <Text>{teamId}</Text>
            </Group>
            <Group flex={1} wrap="nowrap">
              <Text>{t("office")} :</Text>
              <Text>{team?.office?.name}</Text>
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
              <Text>{t("team")} :</Text>
              <Text>{team?.name}</Text>
            </Group>
            <Group flex={1}>
              <Text>{t("status")} :</Text>
              <Text>{team?.status}</Text>
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
              <Text>{t("created_by")} :</Text>
              <Text>{team?.created_by?.username}</Text>
            </Group>
            <Group flex={1}>
              <Text>{t("updated_by")} :</Text>
              <Text>{team?.updated_by?.username}</Text>
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
              <Text>{t("created_at")} :</Text>
              {team?.created_at && <Text>{getDateTime(team?.created_at)}</Text>}
            </Group>
            <Group flex={1}>
              <Text>{t("updated_at")} :</Text>
              {team?.updated_at && <Text>{getDateTime(team?.updated_at)}</Text>}
            </Group>
          </Flex>
        </Box>
      </Paper>
      {/* {opened && (
        <TeacherModal
          opened={opened}
          close={close}
          lng={lng}
          mutate={mutate}
          title={t("update_teacher")}
          editId={databaseID}
        />
      )} */}
      <style jsx global>{`
        .applicant-title {
          border-bottom: 1px solid var(--mantine-color-gray-4);
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

export default TeamInfo;
