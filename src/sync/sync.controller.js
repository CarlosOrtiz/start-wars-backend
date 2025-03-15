const express = require("express");
const { fetchAllCharacters, saveCharacters } = require("../../@common/services/swapi.service");
const router = express.Router();

router.get('/swapi', async (req, res) => {
  try {
    const characters = await fetchAllCharacters();
    await saveCharacters(characters);

    res.json({ message: 'Datos sincronizados exitosamente', total: characters.length });
  } catch (error) {
    console.error('Error al sincronizar datos:', error);
    res.status(500).json({ error: 'Error al sincronizar datos' });
  }
});

module.exports = router;