// const tokenValidate = (request, response) => {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < 16; i += 1) {
//      result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   console.log(result);
//     return response.status(200).json({ token: 'deu certo' });
// };

const rand = () => Math.random().toString(36).substr(2); 

const token = () => (rand() + rand()).slice(0, 16); 

module.exports = token;

// module.exports = tokenValidate;