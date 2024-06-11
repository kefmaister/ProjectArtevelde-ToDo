export const getDefensieData = async (req, res) => {
  console.log(req.body.task.capturedLists.Belair);
  res.status(200).json({
    foo: "bar",
  });
};
