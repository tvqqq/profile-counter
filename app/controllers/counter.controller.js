const { DdbService } = require("../services/ddb.service");
const gradientBadge = require("gradient-badge");

class ConfigController {
  constructor() {
    this.ddbService = new DdbService();
  }

  index = async (req, res, next) => {
    const username = "tvqqq"; // TODO: support more username
    const value = await this.ddbService.updateVal(username);

    const body = gradientBadge({
      subject: "👀 qeo_profile_views",
      status: value.toLocaleString("de-DE"),
      style: undefined, // 'flat' or undefined, optional
      gradient: ["b65cff", "11cbfa"], // array of colors (Hexadecimal or name)
    });

    // We need to define no cache so that Github doesn't cache the image
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache,no-store,must-revalidate",
      Expires: 0,
      Pragma: "no-cache",
    };

    return res.status(200).set(headers).send(body);
  };
}

module.exports = new ConfigController();
