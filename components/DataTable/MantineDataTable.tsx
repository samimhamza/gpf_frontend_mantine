"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  Paper,
  Flex,
  Button,
  ActionIcon,
  Switch,
  Menu,
  Tooltip,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { LuGripVertical } from "react-icons/lu";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import classes from "./DndListHandle.module.css";
import cx from "clsx";

import {
  FaRegFilePdf,
  FaRegFileExcel,
  FaRegCopy,
  FaPrint,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { HiMiniBars2, HiMiniBars3, HiMiniBars4 } from "react-icons/hi2";

import { TbFileTypeCsv, TbColumns } from "react-icons/tb";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface DataProps {
  data: Array<any>;
  page: number;
  per_page: number;
  total: number;
  pageSize: number; // rohullah
}
const PAGE_SIZES = [10, 15, 20, 30, 50, 100];

interface DataTableProps {
  title: string | ReactNode;
  showSecondTitle?: boolean;
  columns: Array<any>;
  search: string;
  lng: string;
  selectedRecords: Array<any>;
  setSelectedRecords: Dispatch<SetStateAction<any>>;
  tableDetails: any;
  setTableDetails: Dispatch<SetStateAction<any>>;
  data: DataProps;
  isLoading: boolean;
  showDelete: boolean;
  orderBy: {
    column: string;
    order: "desc" | "asc";
  };
  height?: number;
}

const MantineDataTable = ({
  title,
  showSecondTitle,
  columns,
  search,
  lng,
  selectedRecords,
  setSelectedRecords,
  tableDetails,
  setTableDetails,
  data,
  isLoading,
  showDelete,
  orderBy,
  height,
  ...additionalProps
}: DataTableProps) => {
  const [densityIndex, setDensityIndex] = useState(0);
  const densityConfigurations = [
    {
      tableSize: "xs",
      verticalSpacing: "xs",
      densityIcon: <HiMiniBars4 size={22} />,
    },
    {
      tableSize: "sm",
      verticalSpacing: "sm",
      densityIcon: <HiMiniBars3 size={22} />,
    },
    {
      tableSize: "md",
      verticalSpacing: "md",
      densityIcon: <HiMiniBars2 size={22} />,
    },
  ];
  const { tableSize, verticalSpacing, densityIcon } =
    densityConfigurations[densityIndex];

  const [updatedColumns, setUpdatedColumns] = useState(columns);

  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]); // Set initial page size
  // const [page, setPage] = useState(1); // Set initial page number

  const { t } = useTranslation(lng);
  const [sortStatus, setSortStatus] = useState<{
    columnAccessor: string;
    direction: "desc" | "asc";
  }>({
    columnAccessor: orderBy.column,
    direction: orderBy.order,
  });

  useEffect(() => {
    setTableDetails((d: any) => {
      return { ...d, search: search };
    });
  }, [search, setTableDetails]);

  const handlePageChange = (p: number) => {
    setTableDetails((d: any) => {
      return { ...d, page: p };
    });
  };

  const handleSortStatusChange = (status: any) => {
    setTableDetails((d: any) => {
      return {
        ...d,
        page: 1,
        order_by: {
          column: status.columnAccessor,
          order: status.direction,
        },
      };
    });
    setSortStatus(status);
  };

  const dataTable = (
    <DataTable
      height={height ?? 550}
      highlightOnHover
      withColumnBorders
      striped
      fz={tableSize}
      verticalSpacing={verticalSpacing}
      verticalAlign="top"
      paginationWithEdges
      sortIcons={{
        sorted: <GoSortAsc />,
        unsorted: <GoSortDesc />,
      }}
      pinLastColumn
      columns={updatedColumns}
      fetching={isLoading}
      records={data?.data}
      page={data?.page ? data?.page : 1}
      onPageChange={handlePageChange}
      totalRecords={data?.total}
      // recordsPerPage={data?.per_page ? data?.per_page : 20}
      sortStatus={sortStatus}
      onSortStatusChange={handleSortStatusChange}
      selectedRecords={showDelete ? selectedRecords : undefined}
      onSelectedRecordsChange={showDelete ? setSelectedRecords : undefined}
      loadingText={t("loading_data")}
      noRecordsText={t("no_records")}
      // paginationText={({ from, to, totalRecords }) =>
      // 	`نمایش ${from} - ${to} از ${totalRecords}  مورد `
      // }

      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      recordsPerPage={data?.pageSize || 20}
      recordsPerPageLabel="مورد در هر صفحه"
      // 👇 uncomment the next lines to use custom pagination colors
      // paginationActiveBackgroundColor="green"
      // paginationActiveTextColor="#e6e348"
      {...additionalProps}
    />
  );

  const hideAll = () => {
    setUpdatedColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.accessor === "id" || column.accessor === "actions"
          ? column
          : { ...column, hidden: true }
      )
    );
  };
  const showAll = () => {
    setUpdatedColumns((prevColumns) =>
      prevColumns.map((column) => ({ ...column, hidden: false }))
    );
  };

  const toggleColumnVisibility = (accessor: string) => {
    setUpdatedColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.accessor === accessor
          ? { ...column, hidden: !column.hidden }
          : column
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedColumns = Array.from(updatedColumns);
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);
    setUpdatedColumns(reorderedColumns);
  };

  const customColumn = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="updatedColumns">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {updatedColumns.map((column, index) => (
              <Draggable
                key={column.accessor}
                draggableId={column.accessor}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className={cx(classes.item, {
                      [classes.itemDragging]: snapshot.isDragging,
                    })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      {...provided.dragHandleProps}
                      style={{
                        cursor: "grab",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LuGripVertical
                        style={{ width: "18px", height: "18px" }}
                      />
                    </div>
                    <Menu.Item
                      key={column.accessor}
                      disabled={column.accessor === "id"}
                    >
                      <Switch
                        style={{ height: "24px", fontWeight: "bold" }}
                        labelPosition="right"
                        onChange={() => toggleColumnVisibility(column.accessor)}
                        checked={!column.hidden}
                        label={column.title}
                      />
                    </Menu.Item>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  const onToggleDensity = () => {
    const nextIndex = (densityIndex + 1) % densityConfigurations.length;
    setDensityIndex(nextIndex);
  };

  return (
    <>
      <Paper withBorder shadow="sm" my="md">
        <Flex
          className="datatable_title"
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          px="sm"
          justify={{ sm: "space-between" }}
        >
          <ActionIcon.Group my="md">
            <Tooltip label="Download PDF" withArrow={true}>
              <ActionIcon variant="default" size="lg" aria-label="PDF">
                <FaRegFilePdf />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Download Excel" withArrow={true}>
              <ActionIcon variant="default" size="lg" aria-label="Excel">
                <FaRegFileExcel />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Download CSV" withArrow={true}>
              <ActionIcon variant="default" size="lg" aria-label="CSV">
                <TbFileTypeCsv />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Copy" withArrow={true}>
              <ActionIcon variant="default" size="lg" aria-label="Copy">
                <FaRegCopy />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Print" withArrow={true}>
              <ActionIcon variant="default" size="lg" aria-label="Print">
                <FaPrint />
              </ActionIcon>
            </Tooltip>
          </ActionIcon.Group>

          <Flex direction={{ base: "column", sm: "row" }} my="md">
            <Tooltip label="Toggle Density" withArrow={true}>
              <ActionIcon
                onClick={onToggleDensity}
                size="lg"
                variant="subtle"
                me={10}
              >
                {densityIcon}
              </ActionIcon>
            </Tooltip>

            <Menu closeOnItemClick={false} shadow="md" width={300}>
              <Menu.Target>
                <Tooltip label="Customize Column" withArrow={true}>
                  <ActionIcon size="lg" variant="subtle">
                    <TbColumns size={22} />
                  </ActionIcon>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown
                style={{
                  height: 500,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap="sm"
                    p="sm"
                    justify={{ sm: "center" }}
                  >
                    <Button
                      onClick={showAll}
                      variant="light"
                      leftSection={<FaRegEye size={18} />}
                    >
                      {t("show_all")}
                    </Button>
                    <Button
                      onClick={hideAll}
                      variant="light"
                      leftSection={<FaRegEyeSlash size={18} />}
                    >
                      {t("hide_all")}
                    </Button>
                  </Flex>
                  <Menu.Divider />
                </div>
                <div style={{ flexGrow: 1, overflowY: "auto" }}>
                  {customColumn}
                </div>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>
        {/* {typeof title === 'string' ? (
					<Center className="datatable_title">
						<Group justify="space-between" align="center" p="sm">
							<Title order={4}>{title}</Title>
							{data?.total && <Badge>{data?.total}</Badge>}
						</Group>
					</Center>
				) : (
					<Box className="datatable_title">{title}</Box>
				)} */}
        {dataTable}
      </Paper>
      <style jsx global>{`
        .datatable_title {
          border-bottom: 1px solid var(--mantine-color-gray-4);
        }
      `}</style>
    </>
  );
};

export { MantineDataTable };
