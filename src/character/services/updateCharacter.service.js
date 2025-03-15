const pool = require('../../../@common/config/db');

const updateCharacter = async (characterId, { name, height, mass, gender }) => {
  try {
    const fields = [];
    const values = [];

    if (name) {
      fields.push(`name = $${fields.length + 1}`);
      values.push(name);
    }
    if (height) {
      fields.push(`height = $${fields.length + 1}`);
      values.push(height);
    }
    if (mass) {
      fields.push(`mass = $${fields.length + 1}`);
      values.push(mass);
    }
    if (gender) {
      fields.push(`gender = $${fields.length + 1}`);
      values.push(gender);
    }

    if (fields.length === 0) {
      return { message: 'No hay datos para actualizar', updated: false };
    }

    values.push(characterId);
    const query = `UPDATE character SET ${fields.join(', ')} WHERE id = $${values.length}`;
    const { rowCount } = await pool.query(query, values);

    if (rowCount === 0) {
      return { message: 'Personaje no encontrado', updated: false };
    }

    return { message: 'Personaje actualizado correctamente', updated: true };
  } catch (error) {
    console.error('Error al actualizar personaje:', error);
    throw new Error('Error interno al actualizar el personaje');
  }
};

module.exports = { updateCharacter }