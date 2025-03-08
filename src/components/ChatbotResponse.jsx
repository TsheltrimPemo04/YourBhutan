import React from "react";

const ChatbotResponse = ({ text }) => {
  const createAnchorTagWithLinkAndText = (textWithLink) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const matches = textWithLink.match(linkRegex);

    if (matches) {
      const [, linkText, link] = matches;
      const anchorTag = <a href={link}>{linkText}</a>;
      return textWithLink.replace(linkRegex, anchorTag);
    } else {
      return textWithLink;
    }
  };

  // Split the text by newline characters and process each line
  const lines = text.split("\n");
  const processedText = lines.map((line, index) => (
    <p
      key={index}
      dangerouslySetInnerHTML={{ __html: createAnchorTagWithLinkAndText(line) }}
    />
  ));

  return <div>{processedText}</div>;
};

export default ChatbotResponse;
