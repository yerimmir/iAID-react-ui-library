/**
 * Represents the Object which is passed to the [`ref`](https://reactjs.org/docs/refs-and-the-dom.html)
 * callback of the GridLayout component.
 */
export interface GridLayoutHandle {
  /**
   * Represents the current element. If no current element is present, `element` is `null`.
   */
  element: HTMLDivElement | null;
}
