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
  const [cookies, setCookie, removeCookie] = useCookies(["office"]);
  const [office, setOffice] = useState<any>("");

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

  const checkAdmin = () => {
    if (user?.roles?.includes(ADMIN) || user?.roles?.includes(SUPERADMIN)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (checkAdmin()) {
      if (cookies.office) {
        if (cookies.office != "all" && typeof cookies.office == "number") {
          (async function () {
            const { response, status, error } = await callApi({
              method: "GET",
              url: `offices/${cookies.office}`,
            });
            if (status == 200 && response.result == true) {
              setOffice(response.data);
            } else {
              router.push("/office");
            }
          })();
        } else {
          setOffice(cookies.office);
        }
      } else {
        router.push("/office");
      }
    }
  }, [cookies.office]);

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
              {checkAdmin() ? (
                <Button
                  variant="default"
                  mx="xl"
                  onClick={() => {
                    setOpenOfficeModal(true);
                  }}
                >
                  {t("office") + " : "}
                  {office ? (
                    office == "all" ? (
                      t("all_offices")
                    ) : (
                      office?.name + " (" + office?.code + ")"
                    )
                  ) : (
                    <Loader mx="xs" size={15} />
                  )}
                </Button>
              ) : (
                <Box className="border" py="xs" px="sm" mx="xl">
                  {t("office") + " : "}
                  {user?.office_name + " (" + user?.office_code + ")"}
                </Box>
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
      <style jsx global>{`
        .border {
          border: 1px solid var(--mantine-color-gray-4);
          border-radius: 7px;
        }
      `}</style>
    </>
  );
}
