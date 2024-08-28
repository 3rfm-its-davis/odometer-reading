import {
  Item,
  GridCell,
  GridCellKind,
  DataEditor,
  GridSelection,
} from "@glideapps/glide-data-grid";
import { useCallback, useEffect, useState } from "react";
import "@glideapps/glide-data-grid/dist/index.css";
import { ClientOnly } from "remix-utils/client-only";

export default function ReadingReminderDataGrid({ _users }: { _users: any[] }) {
  const users = _users.filter((user) => user.visible);
  const [selectedUserIds, setSelectedUserIds] = useState("");
  const [selection, setSelection] = useState<GridSelection>();

  const getData = useCallback(
    ([col, row]: Item): GridCell => {
      const userRow = users[row];

      const d = userRow[columns[col].id];

      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: d ? d.toString() : "",
        data: d,
      };
    },
    [users]
  );

  if (users.length === 0) {
    return <div>no users</div>;
  }

  const columns = Object.keys(users[0])
    .filter((item) => item !== "posts" && item !== "visible")
    .map((key) => ({
      title: key,
      id: key,
    }));

  return (
    <>
      <input
        hidden
        readOnly
        type="text"
        name="selectedUserIds"
        value={selectedUserIds}
      />
      <ClientOnly>
        {() => (
          <div className="w-screen">
            <DataEditor
              rowSelect={"multi"}
              rowSelectionMode={"multi"}
              rangeSelect={"none"}
              columnSelect={"none"}
              gridSelection={selection}
              rowMarkers={"checkbox"}
              onGridSelectionChange={(selected) => {
                const selectedUserIds = selected.rows
                  .toArray()
                  .map((row) => users[row].id);
                setSelectedUserIds(JSON.stringify(selectedUserIds));
                setSelection(selected);
                return selected;
              }}
              getCellContent={getData}
              columns={columns}
              rows={users.length}
            />
          </div>
        )}
      </ClientOnly>
    </>
  );
}
