import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get("/test", {
          signal: controller.signal,
        });
        if (isMounted) {
          setUsers(response.data); // assuming API returns an array of users
        }
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>User List</h2>
      {users.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default User;
