import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

export const EmojisContainer = styled.div`
  width: 400px; /* Настройте ширину блока смайликов по вашему усмотрению */
  height: 300px; /* Настройте высоту блока смайликов по вашему усмотрению */
  max-height: 400px;
  overflow-y: auto;
  background-color: #fff;
  position: absolute;
  top: -340px; /* Увеличьте отрицательный отступ, чтобы блок смайликов не перекрывал кнопки */
  right: 0;
  z-index: 1;
  padding: 10px;
`;
export const EmojiPickerWrapper = styled(EmojiPicker)``;
