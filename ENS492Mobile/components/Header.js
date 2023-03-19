import { Text, StyleSheet, View } from "react-native";

function Header(props) {
  return (
    <View style={headerStyles.headerContainer}>
      <Text style={headerStyles.headerStyle}>{props.headerText}</Text>
    </View>
  );
}
export default Header;

const headerStyles = StyleSheet.create({
  headerStyle: {
    fontWeight: "bold",
    fontSize: 36,
    margin: 5,
    color: 'white',
  },
  headerContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
  }
});
