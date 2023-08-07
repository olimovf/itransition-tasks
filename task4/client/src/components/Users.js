import React from "react";

const Users = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      lastLogin: "2023-08-01",
      registrationTime: "2023-07-15",
      status: "active",
    },
    {
      id: 2,
      name: "Bruce Wayne",
      email: "bruce@example.com",
      lastLogin: "2023-08-01",
      registrationTime: "2023-07-15",
      status: "block",
    },
    {
      id: 3,
      name: "Jonathan Swift",
      email: "jonathan@example.com",
      lastLogin: "2023-01-01",
      registrationTime: "2023-07-15",
      status: "active",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h4 className="h4 mb-0">User Management Table</h4>
            <div className="btn-group py-1">
              <button className="btn btn-sm btn-danger">Block</button>
              <button className="btn btn-sm btn-success">Unblock</button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <table className="table table-bordered border-primary border border-2">
            <thead>
              <tr>
                <th scope="col" className="border border-2 border-primary">
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th scope="col" className="border border-2 border-primary">
                  №
                </th>
                <th scope="col" className="border border-2 border-primary">
                  Name
                </th>
                <th scope="col" className="border border-2 border-primary">
                  E-mail
                </th>
                <th scope="col" className="border border-2 border-primary">
                  Last Login Time
                </th>
                <th scope="col" className="border border-2 border-primary">
                  Registration Time
                </th>
                <th scope="col" className="border border-2 border-primary">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-2 border-primary">
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td className="border border-2 border-primary">{user.id}</td>
                  <td className="border border-2 border-primary">
                    {user.name}
                  </td>
                  <td className="border border-2 border-primary">
                    {user.email}
                  </td>
                  <td className="border border-2 border-primary">
                    {user.lastLogin}
                  </td>
                  <td className="border border-2 border-primary">
                    {user.registrationTime}
                  </td>
                  <td className="border border-2 border-primary">
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
