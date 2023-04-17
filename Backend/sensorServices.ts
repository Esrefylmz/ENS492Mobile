export const getCompanySensorsByCompanyId = (companyId: any) => {
    const url =`http://10.0.2.2:5063/api/CompanySensors/GetCompanySensorByCompanyId?Id=${companyId}`;
    
    return fetch(url).then((response) => response.json()).catch(function(error){
        console.log('getSensorError' + error.message);
        throw error;
    });
}


export const getCompanySensorsByRoomId = (roomId: any) => {
    const url =`http://10.0.2.2:5063/api/CompanySensors/GetCompanySensorByRoomId?roomId=${roomId}`;
    
    return fetch(url).then((response) => response.json()).catch(function(error){
        console.log('getSensorError' + error.message);
        throw error;
    });
}

export const GetDataByMacId = (macID: any) => {
    const url =`http://10.0.2.2:5063/api/MonitorData/GetDataByMacId?macID=${macID}`;
    console.log(url);
    return fetch(url).then((response) => response.json()).catch(function(error){
        console.log('getSensorDataError' + error.message);
        throw error;
    });
}

export const updateSensor = (sensor: any) =>{
    const url =`http://10.0.2.2:5063/api/CompanySensors/PutCompanySensor`;
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            SoftId: sensor.SoftId,
            MacId: sensor.MacId,
            CompanyId: sensor.CompanyId,
            RoomId: sensor.RoomId,
            LocationInfo: sensor.LocationInfo,
            BuildingId: sensor.BuildingId
        }),
    }).then((response) => response.json()).catch(function(error){
        console.log('updatesensors error' + error.message);
        throw error;
    });
}


export const deleteSensor = (id: any) => {
    const url =`http://10.0.2.2:5063/api/CompanySensors/DeleteCompanySensorsById?id=${id}`;
    return fetch(url, {
        method: "DELETE",
    }).then((response) => response.json()).catch(function(error){
        console.log('deletesensors error' + error.message);
        throw error;
    });
}

export const createSensorDateLog = (sensorDateLog: any) => {
    const url =`http://10.0.2.2:5063/api/SensorDateLog/PostSensorDateLog`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            MacId: sensorDateLog.MacId,
            RoomName: sensorDateLog.RoomName,
            BuildingId: sensorDateLog.BuildingId,
            LocationInfo: sensorDateLog.LocationInfo,
            CompanyId: sensorDateLog.CompanyId,
            LogDate: sensorDateLog.LogDate,
            UserId: sensorDateLog.UserId,
            Username: sensorDateLog.Username,
            Usermail: sensorDateLog.Usermail,
            OldLocationInfo: sensorDateLog.OldLocationInfo,
            OldBuildingId: sensorDateLog.OldBuildingId,
            OldRoomId: sensorDateLog.OldRoomId,
            OldRoomName: sensorDateLog.OldRoomName,
            RoomId: sensorDateLog.RoomId,

        }),
    }).then((response) => response.json()).catch(function(error){
        console.log('createSensorDateLog error' + error.message);
        throw error;
    });
}