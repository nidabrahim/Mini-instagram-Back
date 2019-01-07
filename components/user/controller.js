import services from "./services";

exports.post = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
          message: "name is required"
        });
    }
    services.createUser(req.body).then(
      user => res.status(200).json(user),
      err => {
        res.status(500).send("error");
        return;
      }
    );
};

exports.list = async (req, res) => {
    const list  = await services.listByPage(req.query.page || 1, req.query.per_page || 10)
    res.status(200).send({
        users: list
    });
};
  