export const postTask = (req, res) => {
  const { title, description, userId, status } = req.body;

  if (!title) {
    return res.status(400).json("Please Enter a Title");
  }

  res.status(200).send(req.body);
};
