import { Text, View } from "react-native";
import BuildingList from "./buildingList";

const BuildingItem = ({item}, handleRemoveBuilding, handleToggleBuildingStatus) => {
    console.log('Remove', handleRemoveBuilding);
    console.log('Toggle', handleToggleBuildingStatus);
    return (
        <View>
            <Text>
                {item.name}
                {"             "}
                {item.buildingId}
                {"             "}
                {item.companyId}
            </Text>
        </View>
    )
}

export default BuildingItem;