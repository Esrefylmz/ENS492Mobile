import { Text, ActivityIndicator , FlatList, View} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { loadBuildings , updateBuilding, deleteBuilding, getBuilding, createBuilding} from "../buildingServices";
import BuildingItem from "./buildingItem";

const BuildingList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [buildings, setBuildings] = useState([]);
    const refresh = async () => {
        await loadBuildings().then((buildings) => {
            setBuildings(buildings);
            console.log('Buildings', buildings)
        }).catch((error) => {
            console.log("api call error");


            alert(error.message);
        });
    }

    const handleToggleBuildingStatus = (building) => {
        console.log('building to update', building);
        updateBuilding(building).then((building) => onRefresh()).catch((error) => {
            console.log("updatebuilding api call error");

            alert(error.message);
        });
    }

    const handleFormSubmit = (building) => {
        console.log("building to create", building);
        createBuilding(building).then((building) => onRefresh());
    };


    const handleRemoveBuilding = (building) => {
        console.log('building to remove', building);
        deleteBuilding(building.id).then((building) => onRefresh());
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refresh().then(() => {
            setRefreshing(false);
            console.log('Refreshed data:', buildings);
        });
        console.log('Refreshing State:', refreshing);
    }, [refreshing])

    useEffect(() => {
        refresh();
        console.log('Component mounted or refreshed:', buildings);
    }, [onRefresh]);



    return (
        <>
            <Text>Building List from coming from Backend!</Text>
            {refreshing ? (
                <ActivityIndicator />

            ): (
                <>
                    {buildings.length > 0 ? (
                        <FlatList
                        data={buildings}
                        renderItem={(item) => BuildingItem(
                            item,
                            handleFormSubmit,
                            handleToggleBuildingStatus,
                        )}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: "lightgray",
                                    marginVertical: 10,
                                }}
                            />
                        )}
                    />
                    ): (

                        <Text>No buildings found</Text>
                    )}
                </>
            )}
        </>
    )
}

export default  BuildingList;