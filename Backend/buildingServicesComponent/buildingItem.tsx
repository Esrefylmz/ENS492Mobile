import { Text } from "react-native";

const BuildingItem = ({item}, handleRemoveBuilding, handleToggleBuildingStatus) => {
    console.log('Remove', handleRemoveBuilding);
    console.log('Toggle', handleToggleBuildingStatus);
    return (
        <Text>
            {'${item.name}'}
        </Text>
    )
}

export default BuildingItem;