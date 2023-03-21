const baseUrl = 'http://10.0.2.2:5063/api/CRUD';

export const loadBuildings = () => {
    return fetch(baseUrl).then((response)=>response.json()).catch(function(error){
        console.log('loadbuildings error' + error.message);
        throw error;
    });
}



export const getBuilding = (id: any) => {
    return fetch('${baseUrl}/${id}').then((response) => response.json()).catch(function(error){
        console.log('getBuilding error' + error.message);
        throw error;
    });
}

export const createBuilding = (building: any) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application.json",
        },
        body: JSON.stringify({
            name: building.name,
            CompanyId: building.CompanyId,
        }),
    }).then((response) => response.json()).catch(function(error){
        console.log('createbuildings error' + error.message);
        throw error;
    });
}


export const updateBuilding = (building: any) =>{
    return fetch(baseUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application.json",
        },
        body: JSON.stringify({
            Name: building.Name,
            CompanyId: building.CompanyId,
        }),
    }).then((response) => response.json()).catch(function(error){
        console.log('updatebuildings error' + error.message);
        throw error;
    });
}


export const deleteBuilding = (id: any) => {
    return fetch('${baseUrl}/${id}', {
        method: "DELETE",
    }).then((response) => response.json()).catch(function(error){
        console.log('deletebuildings error' + error.message);
        throw error;
    });
}