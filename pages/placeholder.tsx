import { useDispatch } from 'react-redux';
import useSelector from 'store/util/useSelector';
import React, { useCallback } from 'react';

// action creators
import { fetchUsers } from 'store/placeholder';

// selectors
import { getStatus, getLoading } from 'store/request/selectors';
import { getUsers } from 'store/placeholder/selectors';

const placeholder: React.FC = () => {
  const { fetchUsersStatus, fetchUsersLoading, users } = useSelector(
    (state) => ({
      fetchUsersStatus: getStatus(state, fetchUsers.type),
      fetchUsersLoading: getLoading(state, fetchUsers.type),
      users: getUsers(state),
    })
  );

  const dispatch = useDispatch();
  const dispatchFetchUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [fetchUsers, dispatch]);

  return (
    <div>
      <h1>Placeholder</h1>
      <button onClick={dispatchFetchUsers}>Fetch Placeholder Users</button>
      <p>Fetch Users Status: {fetchUsersStatus}</p>
      <p>Fetch Users Loading: {fetchUsersLoading}</p>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default placeholder;
