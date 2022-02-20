interface IAction {
  action?: {
    fn?: any;
  };
}
export const callAction = ({ action }: IAction) => {
  return action?.fn();
};
