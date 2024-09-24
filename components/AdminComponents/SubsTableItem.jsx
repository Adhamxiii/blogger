const SubsTableItem = ({ email, date, deleteEmail, _id }) => {
  const EmailDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <tr className="border-b bg-white text-left">
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        {email ? email : "No Email"}
      </th>
      <td className="hidden px-6 py-4 sm:block">{EmailDate}</td>
      <td className="cursor-pointer px-6 py-4" onClick={() => deleteEmail(_id)}>x</td>
    </tr>
  );
};

export default SubsTableItem;
