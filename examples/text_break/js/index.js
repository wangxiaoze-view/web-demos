const text = document.querySelector(".text");
const error = document.querySelector(".error");
function getTextNodeAndOffset(clientX, clientY) {
  let textNode;
  let offset;

  if (document.caretPositionFromPoint) {
    const range = document.caretPositionFromPoint(clientX, clientY);
    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    let range = document.caretRangeFromPoint(clientX, clientY);
    textNode = range.startContainer;
    offset = range.startOffset;
  } else return;
  return { textNode, offset };
}

function onHandlerText(event, type) {
  const { clientX, clientY } = event;
  const result = getTextNodeAndOffset(clientX, clientY);
  if (!result) return;
  const { textNode, offset } = result;
  if (textNode.nodeType !== Node.TEXT_NODE) return;

  if (type === "click") {
    const replacement = textNode.splitText(offset);
    replacement.before(document.createTextNode("\n"));
  } else if (type === "mousemove") {
    if (!CSS.highlights) {
      error.textContent = "您的浏览器不支持高亮功能，请使用Chrome浏览器。";
      return;
    }
    try {
      CSS.highlights.clear();
      const range = new Range();
      range.setStart(textNode, offset);
      range.setEnd(textNode, offset + 1);
      const highlights = new Highlight(range);
      CSS.highlights.set("text", highlights);
    } catch {}
  }
}

text.addEventListener("mousemove", (event) => {
  onHandlerText(event, "mousemove");
});

text.addEventListener("click", (event) => {
  onHandlerText(event, "click");
});
