"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  AppShell,
  Avatar,
  Burger,
  Flex,
  Group,
  Title,
  ScrollArea,
  Box,
  Menu,
  rem,
  LoadingOverlay,
  Button,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { LinksGroup } from "./NavbarLinksGroup/NavbarLinksGroup";
import { userProps } from "@/types/next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import { NavItems } from "./NavItems";
import { useCookies } from "react-cookie";
import SelectOfficeModal from "../Office/SelectOfficeModal";
import { ADMIN, SUPERADMIN } from "@/shared/constants/Roles";

const getNameAbbr = (name: string) => {
  var words = name.split(" ");
  var capitalizedLetters = "";
  for (var i = 0; i < words.length; i++) {
    capitalizedLetters += words[i].charAt(0).toUpperCase();
  }
  return capitalizedLetters;
};

export function AdminLayout({
  children,
  lng,
  user,
}: {
  children: React.ReactNode;
  lng: string;
  user: userProps;
}) {
  const [opened, { toggle }] = useDisclosure();
  const { t } = useTranslation(lng);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const callApi = useAxios();
  const navList = NavItems(t);
  const [openOfficeModal, setOpenOfficeModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "office",
    "office_name",
  ]);
  const [officeName, setOfficeName] = useState<string>("");

  const userNavList = navList.filter((item) => {
    if (
      (item.permission && user.permissions.includes(item.permission)) ||
      !item.permission
    )
      return item;
  });

  const logout = async () => {
    setLoading(true);
    const { status } = await callApi({ method: "POST", url: "/logout" });
    removeCookie("office");
    removeCookie("office_name");
    await signOut({
      redirect: false,
    });
    router.push("/auth/login");
    setLoading(false);
  };

  const links = userNavList.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      user_permissions={user.permissions}
    />
  ));

  useEffect(() => {
    if (cookies.office_name) {
      setOfficeName(cookies.office_name);
    }
  }, [cookies.office_name]);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Flex h="100%" px="md" align="center" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
              <Title order={4}>{t("gpf")}</Title>
              {(user?.roles?.includes(SUPERADMIN) ||
                user?.roles?.includes(ADMIN)) && (
                <Button
                  variant="default"
                  mx="xl"
                  onClick={() => {
                    setOpenOfficeModal(true);
                  }}
                >
                  {t("office") + " : "}
                  {officeName ? (
                    officeName == "all" ? (
                      t("all_offices")
                    ) : (
                      officeName
                    )
                  ) : (
                    <Loader mx="xs" size={15} />
                  )}
                </Button>
              )}
            </Group>

            <Menu shadow="md">
              <Menu.Target>
                {user.profile ? (
                  <Avatar
                    radius="xl"
                    color="primary"
                    style={{ cursor: "pointer" }}
                    size={45}
                    src={user.profile}
                    alt=""
                  />
                ) : (
                  <Avatar
                    radius="xl"
                    color="primary"
                    style={{ cursor: "pointer" }}
                    size={45}
                  >
                    {getNameAbbr(user.full_name)}
                  </Avatar>
                )}
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  rightSection={
                    <TbLogout2 style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={logout}
                >
                  {t("logout")}
                </Menu.Item>
                <Menu.Item
                  rightSection={
                    <IoIosSettings
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  {t("settings")}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </AppShell.Header>
        <>
          <LoadingOverlay
            visible={loading}
            zIndex={10000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <AppShell.Navbar p="xs">
            <AppShell.Section grow component={ScrollArea}>
              <Box my="md">{links}</Box>
            </AppShell.Section>
          </AppShell.Navbar>
          <AppShell.Main>{children}</AppShell.Main>
        </>
      </AppShell>
      <SelectOfficeModal
        lng={lng}
        opened={openOfficeModal}
        close={setOpenOfficeModal}
      />
    </>
  );
}
