import React, { useState } from "react";
import { Modal } from "react-uicomp";
import { useNavigation } from "react-auth-navigation";

import { MdEdit, MdDelete, FaClipboardList, IoCreate } from "react-icons/all";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { GhostButton, DefaultButton, IconButton } from "../";
import { ToolTip } from "../index";
import { ActivityIndicator } from "../../hoc";
import { TABLE_LIMIT } from "../../../config";
import { Paragraph } from "../../generics";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}))(TableRow);

const AlternateTable = ({
  columns,
  data,
  actions,
  dataLoader,
  totalCount,
  deleteLoader,
  onDeleteHandler,
  onEditHandler,
  onViewHandler,
  onCreateHandler,
  viewBug,
}) => {
  const { location, navigation } = useNavigation();
  const { navigate } = navigation;
  const [visible, setVisible] = useState(false);
  const [activeRow, setActiveRow] = useState();
  let query = useQuery();

  const pageNumber = query.get("page") || 1;

  function useQuery() {
    return new URLSearchParams(location?.search);
  }

  const page = async (event, newPage = 1) => {
    navigate(location.pathname + `?page=` + Number(newPage));
  };

  return (
    <div className="custom-table">
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        style={{ border: "1px solid #f1f1f1", paddingBottom: 8 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((item, i) => {
                if (item.name) {
                  return (
                    <TableCell key={i} align={`${i === 0 ? "left" : "center"}`}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={i} align={`${i === 0 ? "left" : "center"}`}>
                      {item.field.charAt(0).toUpperCase() + item.field.slice(1)}
                    </TableCell>
                  );
                }
              })}
              {actions ? <TableCell align="center">Actions</TableCell> : null}
            </TableRow>
          </TableHead>
          {data?.length ? (
            <TableBody>
              {data.map((item, index) => {
                return (
                  <StyledTableRow key={index}>
                    {columns.map((col, i) => {
                      if (col.render) {
                        return (
                          <TableCell
                            key={i}
                            align={`${i === 0 ? "left" : "center"}`}>
                            <Paragraph>
                              {col.render(item[col.field], item.id)}
                            </Paragraph>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={i}
                            align={`${i === 0 ? "left" : "center"}`}>
                            <Paragraph>{item[col.field]}</Paragraph>
                          </TableCell>
                        );
                      }
                    })}
                    {actions ? (
                      <TableCell align="center" width={50}>
                        <div style={{ display: "flex" }}>
                          {onViewHandler && (
                            <Button
                              icon={
                                <ToolTip text="View" down>
                                  <FaClipboardList />
                                </ToolTip>
                              }
                              onClick={() => {
                                if (!!viewBug) {
                                  return onViewHandler(item);
                                } else {
                                  return onViewHandler(item.id);
                                }
                              }}
                            />
                          )}
                          {onEditHandler && (
                            <Button
                              style={{ marginLeft: 10, marginRight: 10 }}
                              icon={
                                <ToolTip text="Edit" down>
                                  <MdEdit />
                                </ToolTip>
                              }
                              onClick={() => {
                                onEditHandler(item);
                              }}
                            />
                          )}
                          {onDeleteHandler && (
                            <Button
                              icon={
                                <ToolTip text="Delete" down>
                                  <MdDelete />
                                </ToolTip>
                              }
                              onClick={() => {
                                setVisible(true);
                                setActiveRow(item.id);
                              }}
                            />
                          )}
                          {onCreateHandler && (
                            <Button
                              icon={
                                <ToolTip text="Create Job" down>
                                  <IoCreate
                                    color={
                                      !!item?.complain_details
                                        ?.complain_status ||
                                      !!item?.schedule_details?.resolved
                                        ? "grey"
                                        : "black"
                                    }
                                  />
                                </ToolTip>
                              }
                              onClick={() => {
                                !item?.complain_details?.complain_status &&
                                  !item?.schedule_details?.resolved &&
                                  onCreateHandler(item);
                              }}
                            />
                          )}
                        </div>
                      </TableCell>
                    ) : null}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          ) : null}
        </Table>
        {!dataLoader && !data?.length ? (
          <p style={{ textAlign: "center", paddingTop: 20, paddingBottom: 20 }}>
            No Data
          </p>
        ) : null}
        {dataLoader ? <ActivityIndicator animating={true} /> : null}
      </TableContainer>

      {!dataLoader && data?.length ? (
        <div style={{ width: "100%", display: "flex" }}>
          <Pagination
            style={{
              marginLeft: "auto",
              marginTop: 20,
              display: "inline-block",
            }}
            count={Math.ceil(totalCount / TABLE_LIMIT)}
            boundaryCount={1}
            page={Number(pageNumber)}
            variant="outlined"
            shape="rounded"
            onChange={page}
          />
        </div>
      ) : null}
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onOutsideClick={() => setVisible(false)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Are you sure you want to delete?</h3>
          <ActivityIndicator animating={deleteLoader}>
            <div
              style={{
                width: "100%",
                marginTop: 20,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                float: "right",
              }}>
              <Button
                style={{
                  background: "#ff4343",
                  color: "white",
                  marginRight: 10,
                }}
                onClick={() => {
                  onDeleteHandler(activeRow);
                  setVisible(false);
                }}
                title="Delete"
              />
              <Button onClick={() => setVisible(false)} title="Cancel" />
            </div>
          </ActivityIndicator>
        </div>
      </Modal>
    </div>
  );
};

export default AlternateTable;
