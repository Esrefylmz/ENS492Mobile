const baseUrl = 'http://uskumru.sabanciuniv.edu:5063/api/MeasurementType';


export const loadMeasurementType = () => {
    return fetch(baseUrl).then((response)=>response.json()).catch(function(error){
        console.log('loadMeasurementType error' + error.message);
        throw error;
    });
}