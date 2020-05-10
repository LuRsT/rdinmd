const Mercury = require("@postlight/mercury-parser");
const TurndownService = require("turndown");
const marked = require("marked");
const TerminalRenderer = require("marked-terminal");

marked.setOptions({
  renderer: new TerminalRenderer(),
});

let url = process.argv[2];

Mercury.parse(url).then((result) => {
  const turndownService = new TurndownService();
  const title = result.title;
  const title_marker = "-".repeat(title.length);
  const markdown_content = turndownService.turndown(result.content);
  const full_title = title + "\n" + title_marker + "\n";
  const content = full_title + "\n" + markdown_content;

  console.log(marked(content));
});
