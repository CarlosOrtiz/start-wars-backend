const express = require("express");
const { getCharacters } = require("./services/getCharacters.service");
const { deleteCharacter } = require("./services/deleteCharacter.service");
const { updateCharacter } = require("./services/updateCharacter.service");
const router = express.Router();

router.get("/characters", async (req, res) => {
  const { page, quantity, name, order } = req.query;
  const response = await getCharacters(page, quantity, name, order);

  return res.status(200).send({ success: true, payload: response });
});

router.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteCharacter(id);
    return res.status(response.deleted ? 200 : 404).send({ success: response.deleted, message: response.message });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error interno del servidor" });
  }
});

router.put("/characters/:id", async (req, res) => {
  const { id } = req.params;
  const { name, height, mass, gender } = req.body;

  try {
    const response = await updateCharacter(id, { name, height, mass, gender });
    return res.status(response.updated ? 200 : 404).send({ success: response.updated, message: response.message });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error interno del servidor" });
  }
});

module.exports = router;