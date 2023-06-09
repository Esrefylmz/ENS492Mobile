export const getCompanySensorsByCompanyId = (companyId: any) => {
    const url =`http://10.0.2.2:5063/api/CompanySensors/GetCompanySensorByCompanyId?Id=${companyId}`;
    
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