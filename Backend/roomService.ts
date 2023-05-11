export const getRoomsByBuildingId = (buildingId: any) => {
    const url = `http://uskumru.sabanciuniv.edu:5063/api/Rooms/GetRoomsByBuildingId?buildingId=${buildingId}`;

    return fetch(url).then((response) => response.json()).catch(function(error){
        console.log('getRoomsByBuildingId error' + error.message);
        throw error;
    });
}