import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { USERS_URL } from "../api/urls";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const resp = await axios.get(USERS_URL);
      setUsers(resp?.data);
    } catch (err) {
      console.log("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // select
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  useEffect(() => {
    if (selectedUsers.length !== 0 && selectedUsers.length === users.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers]);

  // actions
  const performAction = async (method, action) => {
    try {
      await axios[method](`${USERS_URL}/${action}`, {
        userIds: selectedUsers,
      });
      // document.querySelector(".toast").classList.add("fade");
      // document.querySelector(".toast").className =
      //   "toast fade show border border-2 border-success";
      // You can show a success message here
    } catch (err) {
      console.log(err.message);
      // You can show an error message here
    }
  };

  const handleBlockUsers = async () => {
    await performAction("put", "block");
  };

  const handleUnblockUsers = async () => {
    await performAction("put", "unblock");
  };

  const handleDeleteUsers = async () => {
    await performAction("delete", "delete");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          {/* <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              className="toast fade hide border border-2 border-success"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header border-success">
                <strong className="me-auto">Block User</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body d-flex align-items-center gap-2">
                <i className="bi bi-check-circle fs-5"></i>
                <p className="mb-0 fw-700 h6">
                  Selected user(s) unblocked successfully
                </p>
              </div>
            </div>
          </div> */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h4 className="h4 mb-0">User Management Table</h4>
            <div className="btn-group py-1">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleBlockUsers()}
              >
                Block
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleUnblockUsers()}
              >
                Unblock
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteUsers()}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
          {/* {showModal && (
            <Modal
              actionType={actionType}
              onClose={closeModal}
              onConfirm={() => performAction(METHOD[actionType], actionType)}
            />
          )} */}
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !users.length ? (
            <p className="fs-4">No users available</p>
          ) : (
            <div className="table-wrapper">
              <table className="table table-bordered border-primary border border-2">
                <thead>
                  <tr>
                    <th scope="col" className="border border-2 border-primary">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                      />
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
                  {users.map((user, ind) => (
                    <tr key={user._id}>
                      <td className="border border-2 border-primary">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => toggleUserSelection(user._id)}
                        />
                      </td>
                      <td className="border border-2 border-primary">
                        {ind + 1}
                      </td>
                      <td className="border border-2 border-primary">
                        {user.name}
                      </td>
                      <td className="border border-2 border-primary">
                        {user.email}
                      </td>
                      <td className="border border-2 border-primary">
                        {user.lastLoginTime?.split("\t").join(", ")}
                      </td>
                      <td className="border border-2 border-primary">
                        {user.registrationTime?.split("\t").join(", ")}
                      </td>
                      <td className="border border-2 border-primary">
                        <span
                          className={`badge ${
                            user.status === "active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
