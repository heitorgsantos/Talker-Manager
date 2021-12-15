const fs = require('fs/promises');

 const deleteId = async (req, res) => {
   const { id } = req.params;
   const talker = await fs.readFile('talker.json');
   const convert = JSON.parse(talker);
   const list = convert.find((element) => Number(element.id) === Number(id));
   convert.splice(list, 1);
   const dataDelete = JSON.stringify(list);
   await fs.writeFile('/talker.json', dataDelete);
  
   return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
 };

module.exports = deleteId;