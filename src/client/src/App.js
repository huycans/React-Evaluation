import React, { useState, useEffect } from 'react';
import { getUsers, getHobbies, getListOfAgesOfUsersWithHobby } from './api/API';
import './SCSS_styles.scss';

const App = () => {
  let [userInfo, setUserInfo] = useState(null);
  let [hobbies, setHobbies] = useState(null);
  let [selectedHobby, setSelectedHobby] = useState("Hobby");//Hobby is default value
  let [hobbiesCountByAge, setHobbiesCountByAge] = useState(null);

  //handle when user select a hobby
  const handleSelect = (e) => {
    const hobby = e.target.value;
    setSelectedHobby(hobby);
    getListOfAgesOfUsersWithHobby(hobby)
      .then(ageGroups => setHobbiesCountByAge(ageGroups));
  };

  //do this once when the app start up
  useEffect(() => {
    getUsers()
      .then((users => {
        setUserInfo(users);
      }),
        rej => console.log(rej));

    getHobbies()
      .then((hobbies => {
        setHobbies(hobbies);
      }),
        rej => console.log(rej));
  }, []);

  const usernameAndAge = (userInfo === null)
    ? null
    : userInfo.map(user => (
      <tr key={user.name}>
        <td className="text-left">{user.username}</td>
        <td className="text-right">{user.age}</td>
      </tr>));

  const hobbyOptions = (hobbies === null)
    ? null
    : hobbies.map(hobby => <option key={hobby} value={hobby}>{hobby}</option>);

  const hobbyCountByAgeDisplay = (hobbiesCountByAge === null)
    ? null
    : <table className="table table-striped age-group">
      <thead className="thead-dark">
        <tr>
          <th className="text-left" scope="col">Age</th>
          <th className="text-right" scope="col">Count</th>
        </tr>
      </thead>
      <tbody>
        {hobbiesCountByAge.map(ageGroup => <tr key={ageGroup.age}>
          <td className="text-left">{ageGroup.age}</td>
          <td className="text-right">{ageGroup.count}</td>
        </tr>)}
      </tbody>
    </table>;


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
      <div className="user-hobby d-flex row justify-content-center flex-column text-center align-items-center">
        <h1>Age demographic of users with hobby</h1>
        <div className="d-flex row justify-content-center flex-column text-center align-items-center">
          <label htmlFor="hobby">Hobby:</label>
          <select className="text-center"
            value={selectedHobby} onChange={handleSelect}
            name="hobby" id="hobby">
            <option value="Hobby">Hobby</option>
            {hobbyOptions}
          </select>
        </div>
        {hobbyCountByAgeDisplay}
      </div>
    </div>
  );
};

export default App;