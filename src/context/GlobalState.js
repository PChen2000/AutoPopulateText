import React, { useReducer, createContext, useContext, useMemo } from 'react';

// create context var
const GlobalContext = createContext();

// return GlobalContext provider to wrap around components
function GlobalProvider(props) {
  const GlobalReducer = (state, action) => {
    if (!action.type) {
      return {
        ...state,
        ...action,
      };
    }

    return {
      ...state,
      [action.type]: action.val,
    };
  };

  const [globalState, dispatchGlobalState] = useReducer(GlobalReducer, {
    example: true,
  });

  const value = useMemo(
    () => ({
      globalState,
      dispatchGlobalState,
    }),
    [globalState]
  );
  return <GlobalContext.Provider value={value} {...props} />;
}

function useGlobalState() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Error with logic');
  }
  const { globalState, dispatchGlobalState } = context;
  return {
    globalState,
    dispatchGlobalState,
  };
}

export { GlobalProvider, useGlobalState };
