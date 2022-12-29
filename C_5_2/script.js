const jsonString = `
{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
}
`;

const data = JSON.parse(jsonString);
const jsonList = data.list;
const list = [];

jsonList.forEach((key) => {
    const nameJson = key.name;
    const ageJson = key.age;
    const profJson = key.prof;
    list.push({
      name: nameJson,
      age: ageJson,
      prof: profJson,
    });
});

console.log('list', list);