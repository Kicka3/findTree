export const data = {
   tree: [
      {
         name: 'name1',
         tree_1: [
            { name: 'name2' },
            { name: 'name3' },
            {
               name: 'name4',
               tree_2: [
                  { name: 'name5' },
                  { name: 'name6' },
                  {
                     tree_3: [
                        { name: undefined },
                        { name: 'name7', age: 20 },
                        { name: 'name8', age: 15 },
                        { name: 'name9', age: 31 },
                        { name: 'name10', age: 30 },
                        { name: undefined, age: undefined },
                        { name: 'empty', age: 'empty' },
                     ],
                  },
               ],
            },
            { name: 'name11' },
         ],
      },
      {
         name: 'name12',
         tree_4: [{ name: 'name3' }],
      },
   ],
};

//Вариант 1
export function findAndProcessTree3(obj) {

   // Рекурсивно проверяем каждый объект на наличие поля 'tree_3'
   for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
         if (Array.isArray(obj[key])) {
            for (let i = 0; i < obj[key].length; i++) {
               if (obj[key][i].hasOwnProperty('tree_3')) {

                  // Фильтруем массив, удаляя объекты с undefined или 'empty' в поле 'name'
                  let filteredArray = obj[key][i].tree_3
                     .filter(item => item.name !== undefined && item.name !== 'empty');

                  // Сортируем массив по полю 'name' в порядке убывания
                  filteredArray.reverse()


                  return filteredArray;
               } else {
                  // Рекурсивно проверяем вложенные объекты
                  let result = findAndProcessTree3(obj[key][i]);
                  if (result) return result;
               }
            }
         } else {
            // Рекурсивно проверяем вложенные объекты
            let result = findAndProcessTree3(obj[key]);
            if (result) return result;
         }
      }
   }
   return null;
}

//Второй Вариант
export const processDataRecursively = (data, keyToFind) => {
   if (typeof data !== 'object' || data === null) {
      return null;
   }

   if (data.hasOwnProperty(keyToFind)) {
      const filteredArray = data[keyToFind]
         .filter(item => item.name && item.name !== 'empty' && item.age !== undefined)
         .sort((a, b) => {
            const numberA = Number(a.name.split('name')[1])
            const numberB = Number(b.name.split('name')[1])
            return numberB - numberA
         })


      return filteredArray;
   }

   let result = null;
   for (const key in data) {
      if (data.hasOwnProperty(key)) {
         const item = data[key];
         result = processDataRecursively(item, keyToFind);
         if (result) break;
      }
   }

   return result;
};

console.log('1 вариант', findAndProcessTree3(data))
console.log('2 вариант', processDataRecursively(data, 'tree_3'))