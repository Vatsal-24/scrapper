const IpoLink = require("../model/IpoLinks");


exports.saveIpoLinks = async (req, res) => {
    try {
      const savedUrl = await IpoLink.create(req.body);
      res.status(200).json({
        status: "success",
        data: {
            savedUrl
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
  