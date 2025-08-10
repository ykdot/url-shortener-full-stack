export default function encodeToBase62(id:number) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const base = 62; 
  
  if (id === 0) {
    return characters[0]; 
  }
  
  let encodedString = '';
  let num = id; 

  while (num > 0) {
    const remainder = num % base;
    encodedString = characters[remainder] + encodedString;
    num = Math.floor(num / base);
  }
  return encodedString;
}