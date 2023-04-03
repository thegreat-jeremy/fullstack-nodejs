const myURL = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);

console.log(myURL);
console.log(myURL.username); // username
console.log(myURL.password); // 비번

const myURL2 = new URL("https://example.org?user=abc&query=xyz&sort=asc");

const user = myURL2.searchParams.get("user");
const query = myURL2.searchParams.get("query");
const sort = myURL2.searchParams.get("sort");

console.log(myURL2.searchParams.keys());
console.log(myURL2.searchParams.values());

myURL2.searchParams.append("user2", "def"); // 새로운 키로 추가 가능
myURL2.searchParams.append("user", "def"); // 기존에 있는 키로 값을 추가하면, 동일한 키가 있으면 그대로 유지하고 하나 더 추가
myURL2.searchParams.set("user", "def"); // 동일한 키가 있으면, 기존 키를 삭제하고 새로 추가해야
console.log(myURL2);

console.log(myURL2.searchParams.getAll("user"));
myURL2.searchParams.delete("user"); // 해당 키를 삭제

console.log(myURL2.searchParams.toString());
