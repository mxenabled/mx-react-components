module.exports = function(content) {

  let srcRegex = /(@autoDocsSrc\(?.+\S\)?)\S/g;
  let targetRegex = /(@autoDocsTarget\(?.+\S\)?)\S/g;
  let targetMatch, targetMatches, srcMatch, srcMatches = [];

  while ((targetMatch = targetRegex.exec(content)) != null) {
    targetMatches.push(targetMatch[0]);
  }

  while ((srcMatch = srcRegex.exec(content)) != null) {
    srcMatches.push(srcMatch[0]);
  }

  console.log("!!!!!!!!!!!!!!!!!",targetMatches, srcMatches)
  return content;
}


