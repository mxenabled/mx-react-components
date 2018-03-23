module.exports = function(content) {
  //Tag Aggregation
  let tagRegex = /(@autoDocsSrc\(?.+\S\)?)\S/g;
  let tagMatch = [];
  let tagName = '';
  let tagList = [];

  while ((tagMatch = tagRegex.exec(content)) !== null) {
    let tagParsed = tagMatch[0].split(/\(|\)/);
    tagName = tagParsed[1];
    if (tagList.indexOf(tagName) === -1) {
      tagList.push(tagName);
    }
  }

  // Create target object with tag names and associated content, remove all src tags in scrubbedContent
  let targets = {};
  let scrubbedContent = content;

  if (tagList.length > 0) {
    for (var i = 0; i < tagList.length; i++) {
      let scrubbedContArr = scrubbedContent.split('@autoDocsSrc(' + tagList[i] + ')');
      scrubbedContent = scrubbedContArr.join('');
      targets[tagList[i]] = scrubbedContArr[1];
    }
  }

  //Replace target target tags with associated values stored in the target object
  for (let target in targets) {
    let scrubbedContArr = scrubbedContent.split('@autoDocsTarget(' + target + ')');
    scrubbedContent = scrubbedContArr.join(targets[target])
  }
  // console.log(scrubbedContent);
  return scrubbedContent;

  // ================ TO DO =================
  // Debugging errors needed:
  //   multiple src tags with the same name  (multiple target tags ok)
  //   target tag without src tag or vice versa 
  //   src tag missing opening or closing sibling
  //   prevent nesting of tags
}

