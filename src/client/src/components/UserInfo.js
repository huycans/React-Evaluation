import React from 'react';

const UserInfo = (props) => {
  const { userInfo, setUserInfo } = props;

  const usernameAndAge = (userInfo === null)
    ? null
    : userInfo.map(user => (
      <tr key={user.name}>
        <td className="text-left">{user.username}</td>
        <td className="text-right">{user.age}</td>
      </tr>));

  return (
    <div className="app container">
      <div className="user-info d-flex row justify-content-center flex-column text-center align-items-center">
        <h1>All users</h1>
        <h4>username and age</h4>
        <table className="table table-striped username">
          <thead className="thead-dark">
            <tr>
              <th className="text-left" scope="col">Username</th>
              <th className="text-right" scope="col">User age</th>
            </tr>
          </thead>
          <tbody>
            {usernameAndAge}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;