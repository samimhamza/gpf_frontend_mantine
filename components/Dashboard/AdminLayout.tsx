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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import { NavItems } from "./NavItems";
import SelectOfficeModal from "../Office/SelectOfficeModal";
import { ADMIN, SUPERADMIN } from "@/shared/constants/Roles";
import { useCookies } from "react-cookie";

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
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const { data: session } = useSession();
  const [opened, { toggle }] = useDisclosure();
  const { t } = useTranslation(lng);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const callApi = useAxios();
  const navList = NavItems(t);
  const [openOfficeModal, setOpenOfficeModal] = useState(false);
  const [office, setOffice] = useState<any>("");
  const [cookies, setCookie, removeCookie] = useCookies(["office"]);

  const checkPermission = (permission: string | string[] | undefined) => {
    if (typeof permission == "string") {
      return session?.user?.permissions.includes(permission);
    } else if (permission && permission?.length > 0) {
      let hasAccess = false;
      permission?.forEach((per) => {
        hasAccess = hasAccess || session?.user?.permissions.includes(per);
      });
      return hasAccess;
    }
    return true;
  };

  const userNavList = navList.filter((item) => {
    if (checkPermission(item.permission)) return item;
  });

  const logout = async () => {
    setLoading(true);
    await signOut({
      redirect: false,
    });
    removeCookie("office");
    const { status } = await callApi({ method: "GET", url: "/logout" });
    setLoading(false);
    router.push("/auth/login");
  };

  const links = userNavList.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      user_permissions={session?.user?.permissions}
    />
  ));

  const checkAdmin = () => {
    return (
      session?.user?.roles?.includes(ADMIN) ||
      session?.user?.roles?.includes(SUPERADMIN)
    );
  };

  useEffect(() => {
    let office = cookies.office;
    if (checkAdmin()) {
      if (office) {
        if (office !== "all") {
          (async function () {
            const { response, status } = await callApi({
              method: "GET",
              url: `offices/${office}`,
            });
            if (status === 200 && response.result) {
              setOffice(response.data);
            } else {
              setOpenOfficeModal(true);
            }
          })();
        } else {
          setOffice(office);
        }
      } else {
        setOpenOfficeModal(true);
      }
    } else {
      removeCookie("office");
      setCookie("office", session?.user?.office_id?.toString());
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
                  {session?.user?.office_name +
                    " (" +
                    session?.user?.office_code +
                    ")"}
                </Box>
              )}
            </Group>

            <Menu shadow="md">
              <Menu.Target>
                {session?.user?.profile ? (
                  <Avatar
                    radius="xl"
                    color="primary"
                    style={{ cursor: "pointer" }}
                    size={45}
                    src={session?.user?.profile}
                    alt=""
                  />
                ) : (
                  <Avatar
                    radius="xl"
                    color="primary"
                    style={{ cursor: "pointer" }}
                    size={45}
                  >
                    {session?.user?.full_name &&
                      getNameAbbr(session?.user?.full_name)}
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
      {openOfficeModal && (
        <SelectOfficeModal
          lng={lng}
          opened={openOfficeModal}
          close={setOpenOfficeModal}
        />
      )}
      <style jsx global>{`
        .border {
          border: 1px solid var(--mantine-color-gray-4);
          border-radius: 7px;
        }
      `}</style>
    </>
  );
}
