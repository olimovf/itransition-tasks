import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { USERS_URL } from "../api/urls";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Users = ({ currUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch users
  const fetchUsers = async () => {
    try {
      const resp = await axios.get(USERS_URL);
      setUsers(resp?.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // checkbox
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

  // actions (block, unblock, delete)
  const performAction = async (method, action) => {
    if (!selectedUsers.length) {
      toast.warn("Please, select at least one user!");
      return;
    }

    try {
      await axios({
        method,
        url: `${USERS_URL}/${action}`,
        data: {
          userIds: selectedUsers,
        },
      });
      toast.success(
        `Selected user(s) ${
          action + (action.endsWith("e") ? "d" : "ed")
        } successfully`
      );
      setSelectedUsers([]);
    } catch (err) {
      toast.error("The action failed, please try again later");
    }
  };

  const updateStatus = (status) => {
    const updatedUsers = users.map((user) =>
      selectedUsers.includes(user._id) ? { ...user, status } : user
    );
    setUsers(updatedUsers);
    if (status === "blocked") {
      const currStatus = updatedUsers.find(
        (user) => user.email === currUser
      )?.status;
      if (currStatus === "blocked") {
        navigate("/login");
      }
    }
  };

  const handleBlockUsers = async () => {
    await performAction("put", "block");
    updateStatus("blocked");
  };

  const handleUnblockUsers = async () => {
    await performAction("put", "unblock");
    updateStatus("active");
  };

  const handleDeleteUsers = async () => {
    await performAction("delete", "delete");
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user._id)
    );
    setUsers(updatedUsers);
    const isCurrUserExists = updatedUsers.find(
      (user) => user.email === currUser
    );
    if (!isCurrUserExists) {
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h4 className="h4 mb-0">User Management Table</h4>
            <div className="btn-group py-1">
              <button
                className="btn btn-sm btn-danger"
                onClick={handleBlockUsers}
              >
                Block
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={handleUnblockUsers}
              >
                Unblock
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={handleDeleteUsers}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !users.length ? (
            <p className="fs-5">No users available</p>
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
                    <tr
                      key={user._id}
                      className={`${currUser === user.email && "table-active"}`}
                    >
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
