export const signup = (req, res) => {
  console.log(req.body);
  const { username, password, gender, profilePic } = req.body;
  res.status(200).send(req.body);
};
