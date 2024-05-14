import { useTranslation } from "@/app/i18n/client";
import {
  Button,
  CloseButton,
  Group,
  Modal,
  ScrollArea,
  Stepper,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { FaArrowRotateLeft, FaCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { MdSend } from "react-icons/md";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import Done from "./Done";

interface CustomModalProps {
  opened: boolean;
  close: () => void;
  steps: any;
  dynamicStep?: any;
  showDynamicStep?: boolean;
  form: any;
  submit: any;
  lng: string;
  title: string;
  editId: number | undefined;
  width?: string;
}

const CustomModal = ({
  opened,
  close,
  steps,
  dynamicStep = undefined,
  showDynamicStep = false,
  form,
  submit,
  lng,
  title,
  editId,
  width,
}: CustomModalProps) => {
  const { t } = useTranslation(lng);
  const theme = useMantineTheme();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState<number | null>(null);
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  let doneStep = {
    title: t("done"),
    icon: <FaCheck />,
    step: <Done />,
  };

  let stepInside = showDynamicStep
    ? [...steps, dynamicStep, doneStep]
    : [...steps, doneStep];

  const next = async () => {
    setLoading(active);
    if (active < stepInside.length - 1) {
      let res = await stepInside[active].validate();
      if (res) {
        setActive(active + 1);
        form.clearErrors();
      } else {
        // if (!invalids.includes(active)) {
        // 	setInvalids([...invalids, active]);
        // }
      }
    }
    setLoading(null);
  };
  const prev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };
  const restart = () => {
    setActive(0);
    form.reset();
  };
  const changeStep = async (index: number) => {
    if (active !== stepInside.length - 1) {
      let res = true;
      for (let i = 0; i < index; i++) {
        let stepRes = await stepInside[i].validate();
        res = res && stepRes;
      }
      if (res && index !== stepInside.length - 1) {
        setActive(index);
      }
    }
  };

  const submitInside = async () => {
    setLoading(active);
    let isValid = await stepInside[active].validate();
    if (isValid) {
      form.validate();
      if (form.isValid()) {
        let res = await submit();
        if (res) {
          setActive(active + 1);
          form.clearErrors();
        }
      }
    }
    setLoading(null);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={mdMatches ? (width ? width : "65%") : smMatches ? "80%" : "100%"}
        className='custom-modal'
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: "pop" }}
        lockScroll={true}
        closeOnClickOutside={false}
      >
        <Group justify='space-between' className='modal-header' p='xs'>
          <Title order={4}>{"title"}</Title>
          <CloseButton
            className='close-btn'
            aria-label='Close modal'
            onClick={close}
          />
        </Group>
        <Group
          justify='space-between'
          align='flex-start'
          p='xs'
          className='modal-header'
        >
          <Stepper
            active={active}
            onStepClick={changeStep}
            style={{ flex: 1 }}
            py='sm'
          >
            {stepInside.map((step, i) => (
              <Stepper.Step
                icon={step.icon}
                label={smMatches ? step.title : ""}
                key={i}
                color='primary'
                loading={loading == i}
              />
            ))}
          </Stepper>
        </Group>
        <ScrollArea h={370}>
          {stepInside.map((step, i) => (
            <div
              key={i}
              className={`stepper-item ${active == i ? "show" : "hide"} `}
            >
              {active == i && step.step}
            </div>
          ))}
        </ScrollArea>
        <Group justify='flex-end' p='sm' className='modal-footer'>
          {active == stepInside.length - 1 && (
            <Button
              rightSection={<IoMdCloseCircle />}
              variant='filled'
              color='red'
              onClick={close}
            >
              {t("close")}
            </Button>
          )}
          {active !== 0 && active !== stepInside.length - 1 && (
            <Button leftSection={<TbChevronRight />} onClick={prev}>
              {t("prev")}
            </Button>
          )}
          {active == stepInside.length - 2 ? (
            <Button
              rightSection={
                <MdSend
                  style={{
                    transform: "rotate(-180deg)",
                  }}
                />
              }
              type='submit'
              onClick={submitInside}
            >
              {t("submit")}
            </Button>
          ) : (
            active !== stepInside.length - 1 && (
              <Button rightSection={<TbChevronLeft />} onClick={next}>
                {t("next")}
              </Button>
            )
          )}
          {active == stepInside.length - 1 && !editId && (
            <Button rightSection={<FaArrowRotateLeft />} onClick={restart}>
              {t("restart")}
            </Button>
          )}
        </Group>
      </Modal>
      <style jsx global>{`
        .custom-modal .mantine-Modal-body {
          padding: 0;
        }
        .custom-modal .modal-header {
          border-bottom: 1px solid var(--mantine-color-gray-4);
        }
        .custom-modal .modal-footer {
          border-top: 1px solid var(--mantine-color-gray-4);
        }
        .custom-modal .mantine-Modal-inner {
          left: 0;
          right: 0;
        }
      `}</style>
    </>
  );
};

export default CustomModal;
