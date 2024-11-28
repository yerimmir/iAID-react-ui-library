/**
 * @hidden
 */
export const focusFirstFocusableChild = (target: any): void => {
  if (target) {
    if (
      (target instanceof HTMLInputElement || target.tabIndex !== -1) &&
      target.focus
    ) {
      target.focus();
      return;
    }

    const element = target.querySelector(
      'input, [tabindex]:not([tabindex="-1"])'
    );
    if (element && element.focus) {
      element.focus();
    }
  }
};
