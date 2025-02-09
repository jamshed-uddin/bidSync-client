/* eslint-disable react/prop-types */

const DashboardTitle = ({ children, className }) => {
  return <h1 className={`text-lg font-semibold ${className}`}>{children}</h1>;
};

export default DashboardTitle;
