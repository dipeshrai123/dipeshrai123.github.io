import React, { useEffect } from "react";
import { useAuth, useNavigation } from "react-auth-navigation";
import { useDispatch, useSelector } from "react-redux";
import { useDocTitle } from "../../../hooks";
import { Button, Box } from "../../commons";
import { CommonTable as Table } from "../../commons";

// IMPORT HOCS
import { CompWrapper, Card } from "../../hocs";

import { getBuildingListAction, deleteBuildingAction } from "../../../redux";
import { FILE_URL } from "../../../config";

export const BuildingPage = () => {
  const { location, navigation } = useNavigation();
  const { toast } = useAuth();
  const { navigate, routes } = navigation;
  useDocTitle("Building");

  const dispatch = useDispatch();
  const { list, listloading, totalCount, deleteLoading } = useSelector(
    (state) => state.building,
  );

  let query = useQuery();

  function useQuery() {
    return new URLSearchParams(location?.search);
  }
  const pageNumber = query.get("page") || 1;

  useEffect(() => {
    dispatch(getBuildingListAction(pageNumber));
  }, [pageNumber]);

  const deleteHandler = (id) => {
    dispatch(deleteBuildingAction(id, toast, pageNumber));
  };

  const viewHandler = (id) => {
    navigate(`/building/view/${id}`);
  };

  const editHandler = (item) => {
    navigate(routes["Building"].path + "/edit/" + item.id);
  };

  return (
    <CompWrapper>
      <Box>
        <Card>
          <Box flexBox alCenter jSpace>
            <div>Building</div>
            <Box>
              <Button
                title="Add Building"
                onClick={() => {
                  navigate(routes["Add Building"].path);
                }}
              />
            </Box>
          </Box>
          <Box mt={20}>
            <Table
              columns={[
                {
                  name: "Photo",
                  field: "prop_image",
                  render: (rowData) =>
                    rowData && (
                      <img
                        alt="Avatar"
                        src={`${FILE_URL}/site/${rowData[0]}`}
                        style={{ height: 60, width: 60, borderRadius: 50 }}
                      />
                    ),
                },
                {
                  field: "prop_name",
                  name: "name",
                },
                {
                  field: "prop_type",
                  name: "type",
                },
                {
                  field: "prop_construction",
                  name: "construction",
                },
                {
                  field: "prop_address",
                  name: "address",
                  render: (rowData) => rowData && <p>{rowData?.value}</p>,
                },
                {
                  field: "floors",
                  name: "floors",
                },
                {
                  field: "stairs",
                  name: "stairs",
                },
              ]}
              data={list}
              dataLoader={listloading}
              totalCount={totalCount}
              actions
              deleteLoader={deleteLoading}
              // onDeleteHandler={deleteHandler}
              onEditHandler={editHandler}
              // onViewHandler={viewHandler}
            />
          </Box>
        </Card>
      </Box>
    </CompWrapper>
  );
};

export default BuildingPage;
