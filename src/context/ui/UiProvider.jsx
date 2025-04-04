import { useReducer } from 'react';
import { UiContext } from './UiContext';
import { uiReducer } from './UiReducer';

const UI_INITIAL_STATE = {
  isMenuOpen: false
};

export const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu' });
  };

  return (
    <UiContext.Provider
      value={{
        isMenuOpen: state.isMenuOpen,
        toggleSideMenu
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
