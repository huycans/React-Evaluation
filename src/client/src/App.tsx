import React, { useState, useEffect, ChangeEvent } from "react";
import { getUsers, getHobbies, getListOfAgesOfUsersWithHobby } from "./api/API";
import UserInfo from "./components/UserInfo";
import HobbyCount from "./components/HobbyCount";

import "./styles/App.scss";

const App = function () {
  let [userInfo, setUserInfo] = useState(null);
  let [hobbies, setHobbies] = useState(null);
  let [selectedHobby, setSelectedHobby] = useState("Hobby"); //Hobby is default value
  let [hobbiesCountByAge, setHobbiesCountByAge] = useState(null);

  //handle when user select a hobby
  const handleSelect = (hobby: string) => {
    setSelectedHobby(hobby);
    getListOfAgesOfUsersWithHobby(hobby).then((ageGroups) =>
      setHobbiesCountByAge(ageGroups)
    );
  };

  //fetch data when the app start up, this will happen only once
  useEffect(() => {
    getUsers().then(
      (users) => {
        setUserInfo(users);
      },
      (rej) => console.log(rej)
    );

    getHobbies().then(
      (hobbies) => {
        setHobbies(hobbies);
      },
      (rej) => console.log(rej)
    );
  }, []);

  return (
    <div className="app container">
      <UserInfo userInfo={userInfo}></UserInfo>
      <HobbyCount
        handleSelect={handleSelect}
        hobbies={hobbies}
        hobbiesCountByAge={hobbiesCountByAge}
        selectedHobby={selectedHobby}
      ></HobbyCount>
    </div>
  );
};

export default App;
