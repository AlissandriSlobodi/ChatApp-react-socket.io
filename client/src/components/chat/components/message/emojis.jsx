import PropTypes from "prop-types";
import { EmojisContainer, EmojiPickerWrapper } from "./emojis.styles";
import { useState } from "react";

const Emojis = ({ pickEmoji }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setChosenEmoji(emoji.url);
    pickEmoji(emoji.emoji);
  };

  return (
    <EmojisContainer>
      <EmojiPickerWrapper onEmojiClick={handleEmojiClick} />
      {chosenEmoji && (
        <img src={chosenEmoji} alt="Chosen Emoji" /> // Отображаем выбранный смайлик в виде картинки
      )}
    </EmojisContainer>
  );
};

Emojis.propTypes = {
  pickEmoji: PropTypes.func,
};

export default Emojis;
