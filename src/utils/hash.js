import bcrypt from "bcrypt";

const saltRounds = 10;

// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//   if (err) throw err;

//   console.log("hash =", hash);

//   bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//     if (err) throw err;

//     console.log(result);
//   });
// });

export const hash = async (password) => {
  return new Promise((res, rej) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) rej(err);

      res(hash);
    });
  });
};

export const compare = async (userInput, userHash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(userInput, userHash, function (err, result) {
      if (err) rej(err);

      res(result);
    });
  });
};
