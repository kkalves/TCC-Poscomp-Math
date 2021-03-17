import React from "react";
import { FAB, Portal, Provider } from "react-native-paper";

const FloatingButton = ({ StandardPress, SubjectPress, YearPress }) => {
  const [state, setState] = React.useState({ open: false });

  const onStageChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          color="white"
          open={open}
          icon={open ? "close" : "play"}
          fabStyle={{
            backgroundColor: "#25da48",
          }}
          actions={[
            {
              icon: "tablet-dashboard",
              label: "Simulado Padrão",
              style: {
                backgroundColor: "#006999",
              },
              onPress: () => StandardPress(),
            },
            {
              icon: "bookmark-multiple",
              label: "Simulado por Área",
              style: {
                backgroundColor: "#00939b",
              },
              onPress: () => SubjectPress(),
            },
            {
              icon: "calendar-today",
              label: "Simulado por Ano",
              style: {
                backgroundColor: "#00bb7e",
              },
              onPress: () => YearPress(),
            },
          ]}
          onStateChange={onStageChange}
        />
      </Portal>
    </Provider>
  );
};

export default FloatingButton;
