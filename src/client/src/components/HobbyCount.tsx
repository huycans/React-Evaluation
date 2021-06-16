import React, { FC } from "react";
import { HobbyCount } from "../interface";

interface HobbyCountProps {
  hobbies: string[];
  hobbiesCountByAge: HobbyCount[];
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedHobby: string;
}

const HobbyCount: FC<HobbyCountProps> = (props) => {
  const { hobbies, hobbiesCountByAge, handleSelect, selectedHobby } = props;

  const hobbyOptions =
    hobbies === null
      ? null
      : hobbies.map((hobby) => (
          <option key={hobby} value={hobby}>
            {hobby}
          </option>
        ));

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
        <label htmlFor="hobby">Hobby:</label>
        <select
          className="text-center"
          value={selectedHobby}
          onChange={handleSelect}
          name="hobby"
          id="hobby"
        >
          <option value="Hobby">Hobby</option>
          {hobbyOptions}
        </select>
      </div>
      {hobbyCountByAgeDisplay}
    </div>
  );
};

export default HobbyCount;
