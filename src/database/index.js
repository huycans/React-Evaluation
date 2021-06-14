'use strict';
const _ = require('lodash');
const db = require('./db.js');

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
  return mockDBCall(dataAccessMethod);
};
const getHobbies = () => {
  const dataAccessMethod = () => {
    // should return an array of hobbies without duplicate value.
    let hobbySet = new Set();
    for (let user in db.hobbiesOfUserByUsername) {
      for (let hobby of db.hobbiesOfUserByUsername[user]) {
        hobbySet.add(hobby);
      }
    }
    return Array.from(hobbySet);
  };
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (hobby) => {
  const dataAccessMethod = () => {
    //should return an arry of age count based on hobby.
    //assume that every user has a different name

    let usersWithHobby = [];

    //filter out users who do not have hobby
    for (let user in db.hobbiesOfUserByUsername) {
      if (db.hobbiesOfUserByUsername[user].indexOf(hobby) !== -1) {
        usersWithHobby.push(user);
      }
    }

    //count the age of the users with hobby
    let ageCount = {};
    for (let userId in db.usersById) {//for every user info object in db
      const userInfo = db.usersById[userId];
      if (usersWithHobby.indexOf(userInfo.username) !== -1) {//if user has the same name as user with hobby
        if (!ageCount[userInfo.age]) {//and if user's age group has not been assigned yet
          ageCount[userInfo.age] = 1;
        }
        else {//found the age group of this user
          ageCount[userInfo.age] += 1;
        }
      }
    }

    //convert ageCount object to array
    let result = [];
    for (let age in ageCount) result.push({ age: +age, count: ageCount[age] });

    return result;
    // return [
    //   { age: 18, count: 2 },
    //   { age: 12, count: 1 },
    // ];
  };
  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getListOfAgesOfUsersWith,
  getHobbies,
};
