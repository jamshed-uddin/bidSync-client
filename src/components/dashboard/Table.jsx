const Table = ({ column, data }) => {
  return (
    <div className="overflow-auto   h-[70vh] ">
      <table className="w-max relative min-w-full">
        <thead className=" bg-gray-100 sticky top-0 left-0 right-0 z-50 border border-black">
          <tr className=" ">
            {column?.map((singleColumn) => (
              <th
                key={singleColumn.field}
                className="text-left px-2 text-lg font-semibold py-2   overflow-hidden"
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
          {data?.map((item) => (
            <tr
              key={item._id}
              className="  border border-black  text-left  text-base overflow-x-scroll h-12 max-h-11 px-2"
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
    </div>
  );
};

export default Table;
