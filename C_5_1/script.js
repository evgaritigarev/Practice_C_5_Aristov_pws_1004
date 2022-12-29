const parserXML = new DOMParser();

const xmlString = `
<list>
  <student>
   <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const xmlDOM = parserXML.parseFromString(xmlString, "text/xml");

const studentXML = xmlDOM.querySelectorAll("student");

const list = [];

studentXML.forEach((item) => {
  const nameXML = item.querySelector("name");
  const firstName = nameXML.querySelector("first");
  const lastName = nameXML.querySelector("second");
  const ageXML = item.querySelector("age");
  const profXML = item.querySelector("prof");
  const langXML = nameXML.getAttribute("lang");
  list.push({
    name: `${firstName.textContent} ${lastName.textContent}`,
    age: ageXML.textContent,
    prof: profXML.textContent,
    lang: langXML,
  });
});

console.log('list', list);