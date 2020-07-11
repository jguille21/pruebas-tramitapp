// recover data
const url = './dist/passwords.txt';
const strings = {
   notFound: 'not found',
   found: 'found'
};
let data;

async function fetchTest() {
   const response = await fetch(url);
   const responseText = await getTextFromStream(response.body);
   data = responseText;
}

async function getTextFromStream(readableStream) {
   const reader = readableStream.getReader();
   const utf8Decoder = new TextDecoder();
   let nextChunk;
   let resultStr = '';

   while (!(nextChunk = await reader.read()).done) {
      const partialData = nextChunk.value;
      resultStr += utf8Decoder.decode(partialData);
   }

   return resultStr;
}

(async () => {
   await fetchTest();
})();

// check against data
document.querySelector('button#btnCheck').addEventListener('click', () => {
   const domShowResult = document.querySelector('p#checkResult');
   const passwordToCheck = document.querySelector('input#inputPassword').value;
   const result = data.includes(passwordToCheck);
   domShowResult.innerHTML = (result) ? strings.found : strings.notFound;
});