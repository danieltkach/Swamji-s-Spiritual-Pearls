let wordsCount = { code: 3 };
let word = "code";

if (!wordsCount[word]) {
	wordsCount[word] = 0;
}
wordsCount[word]++;

console.log(wordsCount);