import { useState } from "react";

const Table = ({ column, data, itemsPerPageArray = [5, 10, 15] }) => {
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageArray.at(0));
  const [page, setPage] = useState(1);
  console.log(itemsPerPage);

  return (
    <div className="overflow-auto relative min-h-[70vh] max-h-[70vh] hide-scrollbar  flex flex-col">
      <table className="w-max relative min-w-full">
        <thead className=" bg-gray-100 sticky top-0 left-0 right-0 z-50 border-b border-black">
          <tr className=" ">
            {column?.map((singleColumn) => (
              <th
                key={singleColumn.field}
                className="text-left px-2 text-lg font-semibold py-3  overflow-hidden "
                style={{
                  width: singleColumn.width
                    ? `${singleColumn.width}px`
                    : "fit-content",
                }}
              >
                {singleColumn.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {data
            ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((item) => (
              <tr
                key={item.amount}
                className="  h-[3.2rem]  text-left  text-base overflow-x-scroll  px-2 border-b border-black"
              >
                {column.map((singleColumn) => (
                  <td
                    key={singleColumn.field}
                    className="px-2  overflow-hidden"
                    style={{
                      maxWidth: singleColumn.width
                        ? `${singleColumn.width}px`
                        : "fit-content",
                    }}
                  >
                    {singleColumn.field.toLowerCase() === "action" ? (
                      singleColumn.renderCell(item)
                    ) : (
                      <h2 className="w-max">{item[singleColumn.field]}</h2>
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* table pagination */}
      <div className="sticky bottom-0 left-0  right-0 bg-gray-100 z-20   px-2  py-2    flex items-center gap-3 justify-end pr-5 mt-auto">
        {/* items per page handler */}
        <div className="flex items-center gap-2">
          <h4>Item per page</h4>
          <select
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="select select-sm focus:outline-none"
          >
            {itemsPerPageArray?.map((itemNum) => (
              <option key={itemNum} value={itemNum}>
                {itemNum}
              </option>
            ))}
          </select>
        </div>
        {/* prev and next button */}
        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="disabled:opacity-60 font-medium"
          >
            Prev
          </button>
          <span className="bg-white rounded-md py-1 px-4">{page}</span>
          <button
            disabled={itemsPerPage > data?.length - page * itemsPerPage}
            onClick={() => setPage((p) => p + 1)}
            className="disabled:opacity-60 font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
