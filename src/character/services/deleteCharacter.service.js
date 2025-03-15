const pool = require('../../../@common/config/db');

const deleteCharacter = async (characterId) => {
  try {
    const { rowCount } = await pool.query(`DELETE FROM character WHERE id = $1`, [characterId]);
    if (rowCount === 0) {
      return { message: 'Personaje no encontrado', deleted: false };
    }
    return { message: 'Personaje eliminado correctamente', deleted: true };
  } catch (error) {
    console.error('Error al eliminar personaje:', error);
    throw new Error('Error interno al eliminar el personaje');
  }
};

module.exports = { deleteCharacter }