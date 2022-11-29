export default function parsePost(postText: string) {
  let [title, ...other] = postText.split("\n");
  let content = other.join("\n");

  if (!content) {
    [content, title] = [title, content];
  }

  return {
    content: content.trim(),
    title: title.trim(),
  };
}
