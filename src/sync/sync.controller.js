const express = require("express");
const { fetchAllCharacters, saveCharacters } = require("../../@common/services/swapi.service");
const router = express.Router();

router.get('/characters', async (req, res) => {
  try {
    const characters = await fetchAllCharacters();
    await saveCharacters(characters);

    res.status(200).send({ success: true, total: characters.length, payload: characters, });
  } catch (error) {
    console.error('Error al sincronizar datos:', error);
    res.status(500).send({ error: 'Error al sincronizar datos' });
  }
});

module.exports = router;