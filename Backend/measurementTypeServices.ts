const baseUrl = 'http://10.0.2.2:5063/api/MeasurementType';


export const loadMeasurementType = () => {
    return fetch(baseUrl).then((response)=>response.json()).catch(function(error){
        console.log('loadMeasurementType error' + error.message);
        throw error;
    });
}