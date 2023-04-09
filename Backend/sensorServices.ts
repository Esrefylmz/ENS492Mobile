export const getCompanySensorsById = (companyId: any) => {
    const url =`http://10.0.2.2:5063/api/CompanySensors/GetCompanySensorById?Id=${companyId}`;
    
    return fetch(url).then((response) => response.json()).catch(function(error){
        console.log('getSensorError' + error.message);
        throw error;
    });
}