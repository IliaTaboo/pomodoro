export const disableBtn = (isDisabled, disableBtnClass, undisableElement) => {
  const $buttons = document.getElementsByClassName(disableBtnClass);

  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].disabled = isDisabled;
  }

  undisableElement.disabled = !isDisabled;
};