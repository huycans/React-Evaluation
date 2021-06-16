const baseURL = "http://localhost:3000";
const PATH = {
  hobbies: "hobbies",
  users: "users",
  userAgeByHobby: "users/age",
};

export const getUsers = () =>
  fetch([baseURL, PATH.users].join("/"), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

export const getHobbies = () =>
  fetch([baseURL, PATH.hobbies].join("/"), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

export const getListOfAgesOfUsersWithHobby = (hobby: string) =>
  fetch([baseURL, PATH.userAgeByHobby, hobby].join("/"), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
