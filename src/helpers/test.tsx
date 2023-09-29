import { useHydrateAtoms } from 'jotai/utils';
import { Provider } from 'jotai';
const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};

export const JotaiProvider = ({ initialValues, children }: any) => {
  return (
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  );
};
