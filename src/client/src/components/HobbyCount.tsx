import React, { FC } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { HobbyCount } from "../api/APIinterface";

interface HobbyCountProps {
  hobbies: string[];
  hobbiesCountByAge: HobbyCount[];
  handleSelect: (hobby: string) => void;
  selectedHobby: string;
}

const HobbyCount: FC<HobbyCountProps> = (props) => {
  const { hobbies, hobbiesCountByAge, handleSelect, selectedHobby } = props;

  const hobbiesDropdown =
    hobbies === null ? null : (
      <DropdownButton
        className="user-hobby__dropdown"
        id="hobby-dropdown-button"
        title={selectedHobby || "Hobby"}
        onSelect={(hobby) => handleSelect(hobby)}
      >
        {hobbies.map((hobby, ind) => (
          <Dropdown.Item
            active={selectedHobby == hobby}
            key={hobby}
            eventKey={hobby}
          >
            {hobby}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );

  const hobbyCountByAgeDisplay =
    hobbiesCountByAge === null ? null : (
      <table className="table table-striped age-group">
        <thead className="thead-dark">
          <tr>
            <th className="text-left" scope="col">
              Age
            </th>
            <th className="text-right" scope="col">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {hobbiesCountByAge.map((ageGroup) => (
            <tr key={ageGroup.age}>
              <td className="text-left">{ageGroup.age}</td>
              <td className="text-right">{ageGroup.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div className="user-hobby d-flex row justify-content-center flex-column text-center align-items-center">
      <h1>Age demographic of users with hobby</h1>
      <div className="d-flex row justify-content-center flex-column text-center align-items-center">
        <label className="hobby-label" htmlFor="hobby">
          Hobby:
        </label>
        {hobbiesDropdown}
      </div>
      {hobbyCountByAgeDisplay}
    </div>
  );
};

export default HobbyCount;
